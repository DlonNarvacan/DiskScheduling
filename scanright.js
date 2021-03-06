import input from "prompt-sync";
const prompt = input({ sigint: true });

let reqs,
  head,
  st = 0,
  right,
  arl,
  tl,
  seektime,
  access,
  delay;

const request = [];
const stchart = [];
const new_stchart = [];
const chart = [];
const data = [];
let cont = [];
let summary = [];
let temp_cont = [];
const new_request = [];
let temp_stchart = [];

console.log("===== SCAN(Ascending) Disk Scheduling Algorithm =====");

reqs = prompt("Number of Requests: ");
head = prompt("Headstart: ");
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
  new_request.push(request[i]);
  while (request[i] > 200 || request[i] < 0) {
    console.log(
      "ERROR: Input should be greater than or equal to 0 or less than or equal to 200!"
    );
    request[i] = prompt(`Queue ${i + 1} : `);
    new_request[i] = request[i];
  }
}

request.sort((a, b) => a - b);

for (let i = 0; i < reqs - 1; i++)
  if (request[i] > head) {
    right = i;
    break;
  }

let check1;
check1 = request.includes("200");

for (let i = right; i < reqs; i++) stchart.push(request[i]);
if (check1 != true) stchart.push(200);
for (let i = right - 1; i >= 0; i--) stchart.push(request[i]);

for (let i = 0; i < stchart.length; i++) temp_stchart.push(stchart[i]);
if (check1 != true) temp_stchart = temp_stchart.filter((item) => item != 200);

for (let i = 0; i < stchart.length; i++) temp_cont.push(temp_stchart[i]);
temp_cont = temp_cont.filter((item) => item !== head);

for (let i = 0; i < request.length; i++) cont.push(temp_cont[i]);
cont = cont.filter((item) => item !== head); // remove head

let prev_head = head,
  start = 0,
  service,
  seek,
  comp,
  track,
  diff;

for (let i = 0; i < cont.length; i++) {
  diff = Math.abs(parseInt(cont[i]) - prev_head);
  service =
    parseInt(arl) + parseInt(tl) + (parseFloat(seektime) + delay * diff);
  seek = parseFloat(seektime) + delay * diff;
  comp = parseFloat(start) + parseInt(access) + delay * diff;
  comp = comp.toFixed(1);
  seek = seek.toFixed(1);
  service = service.toFixed(1);

  for (let j = 0; j < cont.length; j++)
    if (cont[i] == new_request[j]) track = j + 1;

  data.push({
    ID: `Track ${track}`,
    Queue: parseInt(cont[i]),
    Prev: parseInt(prev_head),
    Post: parseInt(cont[i]),
    Diff: diff,
    "ARL+TL": parseInt(arl) + parseInt(tl),
    Seek: parseFloat(seek),
    Service: parseFloat(service),
    Start: parseFloat(start),
    Complete: parseFloat(comp),
  });
  start = comp;
  prev_head = cont[i];
}

summary = data.reduce((pull, { ID, ...x }) => {
  pull[ID] = x;
  return pull;
}, {}); // used to pull the value of data.ID to the first column.

console.log(
  "\n======================        SCAN(Ascending) Disk Request Summary       ======================="
);
console.table(summary);

console.log(
  "============= SCAN(Ascending) Seek Time Movement Chart ============="
);

for (let i = 0; i < stchart.length; i++) new_stchart.push(stchart[i]);

stchart.sort((a, b) => a - b);
console.log(`| ${stchart.join(" | ")} |`);

let temp;
for (let i = 0; i < new_stchart.length; i++) {
  temp = new_stchart[i];
  for (let j = 0; j < new_stchart.length; j++) {
    if (temp == stchart[j]) {
      if (stchart[j] <= 99) chart.push(" ??? |");
      else chart.push(" ???  |");
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
