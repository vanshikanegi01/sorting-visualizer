const container = document.getElementById("container");
function generateArray() {
    
    container.innerHTML = "";
    let size = document.getElementById("size").value;
    for(let i = 0; i < size; i++) {
        let value = Math.floor(Math.random() * 300) + 20;

        let bar = document.createElement("div");

        bar.classList.add("bar");

        bar.style.height = value + "px";
        bar.style.background = "#3b82f6";

        bar.innerText = value;
        container.appendChild(bar);
    }
}
generateArray();
document.getElementById("generate")
        .addEventListener("click", generateArray);

document.getElementById("size")
        .addEventListener("input", function(){

    document.getElementById("sizeValue").innerText =
    this.value;

    generateArray();

});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
let comparisons = 0;
let swaps = 0;

document.getElementById("comparisons").innerText = 0;
document.getElementById("swaps").innerText = 0;
function resetStats() {
    comparisons = 0;
    swaps = 0;

    document.getElementById("comparisons").innerText = 0;
    document.getElementById("swaps").innerText = 0;
}

async function bubbleSort() {
    resetStats();
    let bars = document.querySelectorAll(".bar");

    for(let i = 0; i < bars.length; i++) {

        for(let j = 0; j < bars.length - i - 1; j++) {
             comparisons++;
            document.getElementById("comparisons").innerText = comparisons;

            bars[j].style.background = "red";
            bars[j + 1].style.background = "red";
            let speed = document.getElementById("speed").value;
            await sleep(510 - speed);

            let h1 = parseInt(bars[j].style.height);
            let h2 = parseInt(bars[j + 1].style.height);

            if(h1 > h2) {

    document.getElementById("swaps").innerText =
    `${h1} ↔ ${h2}`;

    bars[j].style.height = h2 + "px";
    bars[j + 1].style.height = h1 + "px";

    let tempText = bars[j].innerText;
    bars[j].innerText = bars[j + 1].innerText;
    bars[j + 1].innerText = tempText;
}
            bars[j].style.background = "#3b82f6";
            bars[j + 1].style.background = "#3b82f6";
        }

        bars[bars.length - i - 1].style.background = "green";
    }
}
async function selectionSort() {

    resetStats();

    let bars = document.querySelectorAll(".bar");

    for(let i = 0; i < bars.length; i++) {

        let minIndex = i;

        bars[minIndex].style.background = "orange";

        for(let j = i + 1; j < bars.length; j++) {

            comparisons++;
            document.getElementById("comparisons").innerText = comparisons;

            bars[j].style.background = "red";

            let speed = document.getElementById("speed").value;
            await sleep(510 - speed);

            let h1 = parseInt(bars[j].style.height);
            let h2 = parseInt(bars[minIndex].style.height);

            if(h1 < h2) {
                bars[minIndex].style.background = "#3b82f6";
                minIndex = j;
                bars[minIndex].style.background = "orange";
            }
            else {
                bars[j].style.background = "#3b82f6";
            }
        }

        if(minIndex != i) {

        let h1 = parseInt(bars[i].style.height);
        let h2 = parseInt(bars[minIndex].style.height);

        document.getElementById("swaps").innerText =
        `${h1} ↔ ${h2}`;

        let tempHeight = bars[i].style.height;
        bars[i].style.height = bars[minIndex].style.height;
        bars[minIndex].style.height = tempHeight;

        let tempText = bars[i].innerText;
        bars[i].innerText = bars[minIndex].innerText;
        bars[minIndex].innerText = tempText;
    }

        bars[i].style.background = "green";
    }
}
async function insertionSort() {

    resetStats();

    let bars = document.querySelectorAll(".bar");

    for(let i = 1; i < bars.length; i++) {

        let j = i;

        while(j > 0) {

            comparisons++;
            document.getElementById("comparisons").innerText = comparisons;

            bars[j].style.background = "red";
            bars[j - 1].style.background = "red";

            let speed = document.getElementById("speed").value;
            await sleep(510 - speed);

            let h1 = parseInt(bars[j].style.height);
            let h2 = parseInt(bars[j - 1].style.height);
            console.log("Comparing:", h2, h1);

           if(h1 < h2) {

            document.getElementById("swaps").innerText =
            `${h1} ↔ ${h2}`;

            let tempHeight = bars[j].style.height;
            bars[j].style.height = bars[j - 1].style.height;
            bars[j - 1].style.height = tempHeight;

            let tempText = bars[j].innerText;
            bars[j].innerText = bars[j - 1].innerText;
            bars[j - 1].innerText = tempText;

            bars[j].style.background = "#3b82f6";
            bars[j - 1].style.background = "#3b82f6";

            j--;
        }
            else {
                break;
            }
        if (j > 0) {
            bars[j].style.background = "#3b82f6";
            bars[j - 1].style.background = "#3b82f6";
        }
        }
    }

    for(let i = 0; i < bars.length; i++) {
        bars[i].style.background = "green";
    }
}
async function mergeSort() {
    let bars = document.querySelectorAll(".bar");
    await mergeSortHelper(bars, 0, bars.length - 1);
    for(let i = 0; i < bars.length; i++) {
    bars[i].style.background = "green";
}

}
async function mergeSortHelper(bars, left, right) {
     if(left >= right) {
        return;
    }
    let mid = Math.floor((left + right) / 2);

    await mergeSortHelper(bars, left, mid);
    await mergeSortHelper(bars, mid + 1, right);
    await merge(bars, left, mid, right);
}
async function merge(bars, left, mid, right) {
    let leftArr = [];
let rightArr = [];

for(let i = left; i <= mid; i++) {
    leftArr.push({
        height: bars[i].style.height,
        text: bars[i].innerText
    });
}

for(let i = mid + 1; i <= right; i++) {
    rightArr.push({
        height: bars[i].style.height,
        text: bars[i].innerText
    });
}
let i = 0;
let j = 0;
let k = left;
while(i < leftArr.length && j < rightArr.length) {

    bars[k].style.background = "red";

    let speed = document.getElementById("speed").value;
    await sleep(510 - speed);

    let leftHeight = parseInt(leftArr[i].height);
    let rightHeight = parseInt(rightArr[j].height);

    comparisons++;
    document.getElementById("comparisons").innerText = comparisons;
        if(leftHeight <= rightHeight) {

        bars[k].style.height = leftArr[i].height;
        bars[k].innerText = leftArr[i].text;

        i++;
    }
    else {

        bars[k].style.height = rightArr[j].height;
        bars[k].innerText = rightArr[j].text;

        document.getElementById("swaps").innerText =
        `Merging ${leftHeight} and ${rightHeight}`;

        j++;
    }

    bars[k].style.background = "#3b82f6";

    k++;
}
while(i < leftArr.length) {

    bars[k].style.height = leftArr[i].height;
    bars[k].innerText = leftArr[i].text;

    i++;
    k++;
}
while(j < rightArr.length) {

    bars[k].style.height = rightArr[j].height;
    bars[k].innerText = rightArr[j].text;

    j++;
    k++;
}
for(let x = left; x <= right; x++) {
    bars[x].style.background = "#3b82f6";
}
}
function updateInfo(algo){
    
    if(algo === "bubble"){
        document.getElementById("description").innerHTML = `
        Bubble Sort is one of the simplest sorting algorithms. It repeatedly compares
        two adjacent elements and swaps them if they are in the wrong order.
        After every pass through the array, the largest unsorted element moves
        to its correct position at the end.
        Example:
        [5, 2, 4, 1]
        Compare 5 and 2 → Swap
        [2, 5, 4, 1]
        Compare 5 and 4 → Swap
        [2, 4, 5, 1]
        Compare 5 and 1 → Swap
        [2, 4, 1, 5]
        `;
        document.getElementById("algo-name").innerText = "Bubble Sort";
        document.getElementById("best").innerText = "O(n)";
        document.getElementById("avg").innerText = "O(n²)";
        document.getElementById("worst").innerText = "O(n²)";
        document.getElementById("space").innerText = "O(1)";
        document.getElementById("example").innerText =
        "Compares adjacent elements and swaps them until sorted.";
    }

    else if(algo === "selection"){
        document.getElementById("description").innerHTML = `
        Selection Sort divides the array into sorted and unsorted parts.
        In each pass, it finds the smallest element from the unsorted portion
        and places it at its correct position.
        Example:
        [5, 2, 4, 1]
        Smallest element = 1
        Swap with first element
        [1, 2, 4, 5]
        Repeat the process for the remaining elements until the array is sorted.
        Selection Sort performs fewer swaps but still requires many comparisons.
        `;
        document.getElementById("algo-name").innerText = "Selection Sort";
        document.getElementById("best").innerText = "O(n²)";
        document.getElementById("avg").innerText = "O(n²)";
        document.getElementById("worst").innerText = "O(n²)";
        document.getElementById("space").innerText = "O(1)";

        document.getElementById("example").innerText =
        "Find minimum and place it at correct position.";
    }

    else if(algo === "insertion"){
        document.getElementById("description").innerHTML = `
        Insertion Sort builds the sorted array one element at a time.
        It takes an element and inserts it into its correct position among
        the already sorted elements on the left side.
        Example:
        [5, 2, 4]
        Insert 2 before 5
        [2, 5, 4]
        Insert 4 between 2 and 5
        [2, 4, 5]
        Insertion Sort is very efficient for small datasets and nearly sorted arrays.
        `;
        document.getElementById("algo-name").innerText = "Insertion Sort";
        document.getElementById("best").innerText = "O(n)";
        document.getElementById("avg").innerText = "O(n²)";
        document.getElementById("worst").innerText = "O(n²)";
        document.getElementById("space").innerText = "O(1)";
        document.getElementById("example").innerText =
        "Insert each element into its correct position.";
    }

    else if(algo === "merge"){
        document.getElementById("description").innerHTML = `
        Merge Sort follows the Divide and Conquer approach.
        It repeatedly divides the array into smaller halves until each part
        contains only one element.
        Then it merges the smaller sorted arrays back together to form
        the final sorted array.
        Example:
        [8, 3, 5, 1]
        Split:
        [8,3] [5,1]
        Split again:
        [8] [3] [5] [1]
        Merge:
        [3,8] [1,5]
        Final Merge:
        [1,3,5,8]
        Merge Sort is one of the fastest general-purpose sorting algorithms.
        `;
        document.getElementById("algo-name").innerText = "Merge Sort";
        document.getElementById("best").innerText = "O(n log n)";
        document.getElementById("avg").innerText = "O(n log n)";
        document.getElementById("worst").innerText = "O(n log n)";
        document.getElementById("space").innerText = "O(n)";
        document.getElementById("example").innerText =
        "Divide array into halves and merge them in sorted order.";
    }
}
document.getElementById("algorithm")
        .addEventListener("change", function(){

    updateInfo(this.value);

});

updateInfo("bubble");

document.getElementById("sort")
        .addEventListener("click", async function() {

    let algo = document.getElementById("algorithm").value;

    if(algo === "bubble") {
        await bubbleSort();
    }
    else if(algo === "selection") {
        await selectionSort();
    }
    else if(algo === "insertion") {
    await insertionSort();
}
else if(algo === "merge") {
    await mergeSort();
}
});