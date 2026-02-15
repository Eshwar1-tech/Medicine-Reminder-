let medicines = [];

function addMedicine() {
  let name = document.getElementById("medName").value;
  let time = document.getElementById("medTime").value;

  if (name && time) {
    medicines.push({ name, time, triggered: false });

    let table = document.getElementById("medTable");
    let row = table.insertRow();
    row.insertCell(0).innerText = name;
    row.insertCell(1).innerText = time;

    document.getElementById("medName").value = "";
    document.getElementById("medTime").value = "";
  } else {
    alert("Enter both medicine and time!");
  }
}

// Alarm modal elements
const alarmSound = document.getElementById("alarmSound");
const alarmModal = document.createElement("div");
alarmModal.id = "alarmModal";
alarmModal.style.cssText = `
  position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
  background: #ffdddd; padding: 20px; border: 2px solid red; text-align: center; z-index: 1000; display: none;
`;
document.body.appendChild(alarmModal);

const alarmText = document.createElement("p");
alarmModal.appendChild(alarmText);

const stopAlarmBtn = document.createElement("button");
stopAlarmBtn.innerText = "OK";
alarmModal.appendChild(stopAlarmBtn);

stopAlarmBtn.addEventListener("click", () => {
  alarmSound.pause();         // stop sound
  alarmSound.currentTime = 0; // reset to start
  alarmModal.style.display = "none"; // hide modal
});

setInterval(() => {
  let now = new Date();
  let current = now.getHours().toString().padStart(2, '0') + ":" +
                now.getMinutes().toString().padStart(2, '0');

  medicines.forEach(med => {
    if (med.time === current && !med.triggered) {
      med.triggered = true;              // mark triggered
      alarmText.textContent = "Time to take " + med.name + "!";
      alarmModal.style.display = "block"; // show modal
      alarmSound.play();                  // start alarm
    }

    // Reset trigger flag if minute has passed
    if (med.time !== current) {
      med.triggered = false;
    }
  });
}, 1000);
