import input from "prompt-sync";
const prompt = input({ sigint: true });

let reqs,
  head,
  st = 0,
  stprev = 0,
  arl,
  tl,
  seektime,
  access,
  delay;

const request = [];
let stchart = [];
const new_stchart = [];
const chart = [];
const prev = [];
const data = [];
let container = [];
let summary = [];

console.log("===== FCFS Disk Scheduling Algorithm =====");

reqs = prompt("Number of Requests: ");
head = prompt("Headstart Movement: ");
while (head > 200 || head < 0) {
  console.log(
    "ERROR: Input should be greater than or equal to 0 or less than or equal to 200!"
  );
  head = prompt("Headstart Movement: ");
}
arl = prompt("Average Rotational Latency: ");
tl = prompt("Transfer Latency: ");
seektime = prompt("Seek Time: ");
access = parseInt(arl) + parseInt(tl) + parseInt(seektime);
delay = prompt("Delay: ");
stchart.push(head);

for (let i = 0; i < reqs; i++) {
  request.push(`${prompt(`Queue ${i + 1} : `)}`);
  while (request[i] > 200 || request[i] < 0) {
    console.log(
      "ERROR: Input should be greater than or equal to 0 or less than or equal to 200!"
    );
    request[i] = prompt(`Queue ${i + 1} : `);
  }
}

let temp_head = head;
for (let i = 0; i < reqs; i++) {
  stchart.push(request[i]);
  container.push(request[i]); // to be used for displaying the summary of the program
  st += Math.abs(request[i] - temp_head); //
  stprev = Math.abs(request[i] - temp_head);
  prev.push(stprev);
  temp_head = request[i];
}

container = container.filter((item) => item !== head); // remove head

let prev_head = head,
  start = 0,
  service,
  seek,
  comp,
  diff;

for (let i = 0; i < container.length; i++) {
  diff = Math.abs(parseInt(container[i]) - prev_head);
  service =
    parseInt(arl) + parseInt(tl) + (parseFloat(seektime) + delay * diff);
  seek = parseFloat(seektime) + delay * diff;
  comp = parseFloat(start) + parseInt(access) + delay * diff;
  comp = comp.toFixed(1);
  seek = seek.toFixed(1);
  service = service.toFixed(1);

  data.push({
    ID: `Track ${i + 1}`,
    Queue: parseInt(container[i]),
    Prev: parseInt(prev_head),
    Post: parseInt(container[i]),
    Diff: Math.abs(parseInt(container[i]) - prev_head),
    "ARL+TL": parseInt(arl) + parseInt(tl),
    Seek: parseFloat(seek),
    Service: parseFloat(service),
    Start: parseFloat(start),
    Complete: parseFloat(comp),
  });
  start = comp;
  prev_head = container[i];
}

summary = data.reduce((pull, { ID, ...x }) => {
  pull[ID] = x;
  return pull;
}, {}); // used to pull the value of data.ID to the first column.

console.log(
  "\n======================        FCFS Disk Request Summary       ======================="
);
console.table(summary);

console.log("\n============= FCFS Seek Time Movement Chart =============");

for (let i = 0; i < stchart.length; i++) new_stchart.push(stchart[i]);

stchart.sort((a, b) => a - b);
if (stchart.includes("0") == true) console.log(`|  ${stchart.join(" | ")} |`);
else console.log(`| ${stchart.join(" | ")} |`);

let temp;
for (let i = 0; i < new_stchart.length; i++) {
  temp = new_stchart[i];
  for (let j = 0; j < new_stchart.length; j++) {
    if (temp == stchart[j]) {
      if (stchart[j] <= 99) chart.push(" ○ |");
      else chart.push(" ○  |");
    } else {
      if (stchart[j] <= 99) chart.push("   |");
      else chart.push("    |");
    }
  }
  console.log(`| ${chart.join(" ")}`);
  chart.splice(0, chart.length); // clear the array
}

console.log(`\nSeek Movement: ${new_stchart.join(" - ")}`);
console.log(`Total Seek Time: ${st} \n`);
