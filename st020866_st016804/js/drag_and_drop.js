function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  // if (ev.target.hasChildNodes()) {
  //   return;
  // }
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

// function evaluate_diff() {
//   var src_elements = [];
//   var dest_elements = [];
//   for (let i = 1; i <= 6; i++) {
//     src_elements[i - 1] = document.getElementById("src-diff_" + i);
//     dest_elements[i - 1] = document.getElementById("dest-diff_" + i);
//   }
//   console.log(src_elements);
//   console.log(dest_elements);
//   var score = 0;
//   for (let i = 0; i < dest_elements.length; i++) {
//     var dest_id = dest_elements[i].getAttribute("id");
//     console.log(dest_id);
//     var childNodes = dest_elements[i].childNodes;
//     if (childNodes.length > 0) {
//       var src_id = childNodes[1].getAttribute("id");
//       console.log(src_id);
//       if (dest_id.split("_")[1] == src_id.split("_")[1]) {
//         console.log("correct");
//         score += 100 / dest_elements.length;
//       } else {
//         console.log("not correct");
//       }
//     }
//   }
// }
