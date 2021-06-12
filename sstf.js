import input from "prompt-sync";
const prompt = input({ sigint: true });

let reqs,
  head,
  st = 0,
  arl,
  tl,
  seektime,
  access,
  delay;

const request = [];
const stchart = [];
const visited = [];
const new_stchart = [];
const chart = [];
const data = [];
let container = [];
let summary = [];

console.log("===== SSTF Disk Scheduling Algorithm =====");

reqs = prompt("Number of Requests: ");
head = prompt("Headstart: ");
arl = prompt("Average Rotational Latency: ");
tl = prompt("Transfer Latency: ");
seektime = prompt("Seek Time: ");
access = parseInt(arl) + parseInt(tl) + parseInt(seektime);
delay = prompt("Delay: ");
stchart.push(head);

for (let i = 0; i < reqs; i++) {
  request.push(`${prompt(`Queue ${i + 1} : `)}`);
  visited.push(0);
}

let temp_head = head;
for (let i = 0; i < reqs; i++) {
  let temp = 1e9,
    k = -1;
  for (let j = 0; j < reqs; j++)
    if (temp_head != request[j] && visited[j] == 0)
      if (temp > Math.abs(temp_head - request[j])) {
        temp = Math.abs(temp_head - request[j]);
        k = j;
      }

  st += temp;
  stchart.push(request[k]);
  container.push(request[k]);
  temp_head = request[k];
  visited[k] = 1;
}

container = container.filter((item) => item !== head); // remove head

let prev_head = head,
  start = 0,
  service,
  seek,
  comp,
  track,
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

  for (let j = 0; j < container.length; j++)
    if (container[i] == request[j]) track = j + 1;

  data.push({
    ID: `Track ${track}`,
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
  "\n======================        SSTF Disk Request Summary       ======================="
);
console.table(summary);

console.log("============= SSTF Seek Time Movement Chart =============");

for (let i = 0; i < stchart.length; i++) new_stchart.push(stchart[i]);

stchart.sort((a, b) => a - b);
console.log(`| ${stchart.join(" | ")} |`);

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
  chart.splice(0, chart.length);
}

console.log(`\nSeek Movement: ${new_stchart.join(" - ")}`);
console.log(`Total Seek Time: ${st} \n`);
