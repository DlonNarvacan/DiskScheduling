import input from "prompt-sync";
const prompt = input({ sigint: true });

let reqs,
  head,
  st = 0,
  right;
const request = [];
const stchart = [];
const new_stchart = [];
const chart = [];

console.log("===== LOOK(Descending) Disk Scheduling Algorithm =====");

reqs = prompt("Number of Requests: ");
head = prompt("Headstart: ");
stchart.push(head);

for (let i = 0; i < reqs; i++) {
  request.push(`${prompt(`Queue ${i + 1} : `)}`);
}

request.sort((a, b) => a - b);

for (let i = 0; i < reqs - 1; i++)
  if (request[i] > head) {
    right = i;
    break;
  }

right = right - 1;

for (let i = right; i >= 0; i--) stchart.push(request[i]);

for (let i = right + 1; i < reqs; i++) stchart.push(request[i]);

console.log(
  "============= LOOK(Descending) Seek Time Movement Chart ============="
);

for (let i = 0; i < stchart.length; i++) new_stchart.push(stchart[i]);

stchart.sort((a, b) => a - b);
console.log(`|  ${stchart.join(" | ")} |`);

let temp;
for (let i = 0; i < new_stchart.length; i++) {
  temp = new_stchart[i];
  for (let j = 0; j < new_stchart.length; j++) {
    if (temp == stchart[j]) {
      if (stchart[j] <= 99) chart.push(" ■ |");
      else chart.push(" ■  |");
    } else {
      if (stchart[j] <= 99) chart.push("   |");
      else chart.push("    |");
    }
  }
  console.log(`| ${chart.join(" ")}`);
  chart.splice(0, chart.length);
}

console.log(`Seek Movement: ${new_stchart.join(" - ")}`);

let tempcon = 0,
  container,
  cnt = 0;
for (let i = 0; i < new_stchart.length; i++) {
  if (cnt == 0) {
    container = Math.abs(parseInt(new_stchart[i]) - tempcon);
    tempcon = new_stchart[i];
  } else {
    container = Math.abs(parseInt(new_stchart[i]) - tempcon);
    tempcon = new_stchart[i];
    st += container;
  }
  cnt++;
}

console.log(`Total Seek Time: ${st}`);
