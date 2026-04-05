function updateclock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const Seconds = String(now.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";

  document.querySelector(".hourse-minuts").textContent=`${String((hours)).padStart(2,'0')}:${minutes}:${Seconds}`

document.querySelector('.time-ampm').textContent=ampm

const date={
    weekday:'long',
    year:'numeric',
    month:'long',
    day:'numeric'
}
document.querySelector('.date').textContent=now.toLocaleString(undefined,date)
}
updateclock()
setInterval(updateclock,1000)