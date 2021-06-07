import input from "prompt-sync";
const prompt = input({ sigint: true });

let reqs,
  head,
  st = 0;
const request = [];
const stchart = [];
const visited = [];
const new_stchart = [];
const chart = [];

console.log("===== SSTF Disk Scheduling Algorithm =====");

reqs = prompt("Number of Requests: ");

head = prompt("Headstart: ");
stchart.push(head);

for (let i = 0; i < reqs; i++) {
  request.push(`${prompt(`Queue ${i + 1} : `)}`);
  visited.push(0);
}

for (let i = 0; i < reqs; i++) {
  let temp = 1e9,
    k = -1;
  for (let j = 0; j < reqs; j++)
    if (head != request[j] && visited[j] == 0)
      if (temp > Math.abs(head - request[j])) {
        temp = Math.abs(head - request[j]);
        k = j;
      }

  st += temp;
  stchart.push(request[k]);
  head = request[k];
  visited[k] = 1;
}

console.log("============= SSTF Seek Time Movement Chart =============");

for (let i = 0; i < stchart.length; i++) new_stchart.push(stchart[i]);

stchart.sort((a, b) => a - b);
console.log(`| ${stchart.join(" | ")} |`);

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
console.log(`Total Seek Time: ${st}`);
