let reqs,
  head,
  st = 0;
const request = [];
const stchart = [];

reqs = prompt("Number of Requests: ");
console.log(`Number of Request: ${reqs}`);

head = prompt("Headstart: ");
console.log(`Headstart ${head}`);

for (let i = 0; i < reqs; i++) {
  request.push(`${prompt(`Queue ${i + 1} :`)}`);
  console.log(`Queue ${i + 1}: ${request[i]}`);
}

stchart.push(head);
for (let i = 0; i < reqs; i++) {
  stchart.push(request[i]);
  st += Math.abs(request[i] - head);
  head = request[i];
}

console.log(stchart.join(" -> "));
console.log(`Total Seek Time: ${st}`);
