let reqs,
  head,
  st = 0;
const request = [];
const stchart = [];
const visited = [];

reqs = prompt("Number of Requests: ");
console.log(`Number of Request: ${reqs}`);

head = prompt("Headstart: ");
console.log(`Headstart ${head}`);

for (let i = 0; i < reqs; i++) {
  request.push(`${prompt(`Queue ${i + 1} :`)}`);
  visited.push(0);
  console.log(`Queue ${i + 1}: ${request[i]}`);
}

stchart.push(head);
for (let i = 0; i < reqs; i++) {
  let temp = 1e9,
    k = -1;
  for (let j = 0; j < reqs; j++) {
    if (head != request[j] && visited[j] == 0)
      if (temp > Math.abs(head - request[j])) {
        temp = Math.abs(head - request[j]);
        k = j;
      }
  }
  st += temp;
  stchart.push(request[k]);
  head = request[k];
  visited[k] = 1;
}

console.log(stchart.join(" -> "));
console.log(`Total Seek Time: ${st}`);
