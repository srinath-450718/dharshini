async function testViteProxy() {
  console.log("--- Testing Vite Proxy on http://localhost:5175 ---");

  // 1. Admin Login
  const loginRes = await fetch("http://localhost:5175/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "srinathv4518@gmail.com",
      password: "Srinath1234@",
    }),
  });
  console.log("Login HTTP Status:", loginRes.status);
  const cookie = loginRes.headers.get("set-cookie");
  console.log("Cookie received:", Boolean(cookie));

  // 2. Fetch Submissions
  const subRes = await fetch("http://localhost:5175/api/admin/submissions", {
    headers: { Cookie: cookie || "" },
  });
  console.log("Submissions HTTP Status:", subRes.status);
  const data = await subRes.json();

  console.log("Success flag:", data.success);
  console.log("Total Submissions:", data.count);
  if (data.submissions && data.submissions.length > 0) {
    const sub = data.submissions[0];
    console.log("First submission ID:", sub.id);
    console.log("Submitted at:", sub.createdAt);
    console.log("Answers length:", sub.answers?.length);
    console.log("Answers preview:");
    sub.answers.forEach((ans: any) => {
      console.log(` - [${ans.questionId}] (${ans.questionType}): ${ans.answer}`);
    });
  }
}

testViteProxy().catch(console.error);
