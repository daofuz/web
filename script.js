const form = document.querySelector("#bookingForm");
const formNote = document.querySelector("#formNote");
const heroVideo = document.querySelector("#heroVideo");

if (heroVideo) {
  const start = Number(heroVideo.dataset.start || 1);
  const end = Number(heroVideo.dataset.end || 7);

  heroVideo.addEventListener("loadedmetadata", () => {
    if (Number.isFinite(start) && heroVideo.duration > start) {
      heroVideo.currentTime = start;
    }
  });

  heroVideo.addEventListener("timeupdate", () => {
    if (Number.isFinite(end) && heroVideo.currentTime >= end) {
      heroVideo.currentTime = start;
      heroVideo.play().catch(() => {});
    }
  });

  heroVideo.play().catch(() => {});
}

function formatMessage(data) {
  return [
    "萧瑟教练你好，我想咨询犹他单板课程。",
    "",
    `姓名：${data.get("name")}`,
    `联系方式：${data.get("contact")}`,
    `当前水平：${data.get("level")}`,
    `期望时间：${data.get("date")}`,
    `训练目标：${data.get("goal") || "暂未填写"}`,
  ].join("\n");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const subject = encodeURIComponent("犹他单板课程预约");
  const body = encodeURIComponent(formatMessage(data));

  formNote.textContent = "已生成私信文案；如果邮件应用没有打开，可以复制表单内容直接私信教练。";
  window.location.href = `mailto:coach@snowline.example?subject=${subject}&body=${body}`;
});
