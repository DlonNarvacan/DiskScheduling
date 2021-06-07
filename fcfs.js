let reqs,
  head,
  st = 0;
const request = [];
const stchart = [];
const new_stchart = [];
const chart = [];

console.log("===== FCFS Disk Scheduling Algorithm =====");

reqs = prompt("Number of Requests: ");
console.log(`Number of Request: ${reqs}`);

head = prompt("Headstart: ");
console.log(`Headstart: ${head}`);
stchart.push(head);

for (let i = 0; i < reqs; i++) {
  request.push(`${prompt(`Queue ${i + 1} :`)}`);
  console.log(`Queue ${i + 1}: ${request[i]}`);
}

for (let i = 0; i < reqs; i++) {
  stchart.push(request[i]);
  st += Math.abs(request[i] - head);
  head = request[i];
}

console.log("============= FCFS Seek Time Movement Chart =============");

for (let i = 0; i < stchart.length; i++) new_stchart.push(stchart[i]);

stchart.sort((a, b) => a - b);
console.log(`=  ${stchart.join(" | ")} |`);

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
  console.log(`=  ${chart.join(" ")}`);
  chart.splice(0, chart.length);
}

console.log(`Seek Movement: ${new_stchart.join(" - ")}`);
console.log(`Total Seek Time: ${st}`);
