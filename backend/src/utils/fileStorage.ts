import fs from "fs";
import path from "path";
import crypto from "crypto";

export interface FileSubmissionItem {
  id: string;
  _id?: string;
  answers: {
    questionId: string;
    questionType: string;
    question: string;
    answer: string;
  }[];
  completed: boolean;
  ipHash?: string;
  createdAt: string;
  updatedAt: string;
}

const getStoragePaths = () => {
  const cwd = process.cwd();
  let baseDir = cwd;
  if (!cwd.endsWith("backend") && !cwd.endsWith("server")) {
    if (fs.existsSync(path.join(cwd, "backend"))) {
      baseDir = path.join(cwd, "backend");
    } else if (fs.existsSync(path.join(cwd, "server"))) {
      baseDir = path.join(cwd, "server");
    }
  }
  const dataDir = path.join(baseDir, "data");
  const filePath = path.join(dataDir, "submissions.json");
  return { dataDir, filePath };
};

// Ensure directory and file exist
const ensureFileExists = (): string => {
  const { dataDir, filePath } = getStoragePaths();
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2), "utf8");
  }
  return filePath;
};

export const getSubmissionsFromFile = (): FileSubmissionItem[] => {
  try {
    const filePath = ensureFileExists();
    const raw = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(raw);
    if (Array.isArray(data)) {
      return data.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
    return [];
  } catch (err) {
    console.error("[FileStorage] Error reading submissions file:", err);
    return [];
  }
};

export const saveSubmissionToFile = (
  answers: {
    questionId: string;
    questionType: string;
    question: string;
    answer: string;
  }[],
  ipHash = "unknown"
): FileSubmissionItem => {
  const filePath = ensureFileExists();
  const existing = getSubmissionsFromFile();

  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  const newSubmission: FileSubmissionItem = {
    id,
    _id: id,
    answers,
    completed: true,
    ipHash,
    createdAt: now,
    updatedAt: now,
  };

  existing.unshift(newSubmission);

  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), "utf8");
  console.log(`[FileStorage] Saved submission ${id} to ${filePath}`);

  return newSubmission;
};
