let arr = [45, 23, 78, 12, 67, 98, 34, 55, 19];  // Initial array to be sorted
let currentAlgorithm = null;
let currentStep = 0;  // To track the current step in the algorithm
let steps = [];  // To store the steps of each algorithm

// Function to visualize the array as bars
function visualizeArray(arr) {
    const barsContainer = document.getElementById("bars");
    barsContainer.innerHTML = '';  // Clear previous bars

    // Create a bar for each element in the array
    arr.forEach(num => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${num}px`;  // Height proportional to the number
        const label = document.createElement("span");
        label.textContent = num;
        bar.appendChild(label);
        barsContainer.appendChild(bar);
    });
}

// Function to store each step of sorting algorithms
function storeStep(newArr) {
    steps.push([...newArr]);
}

// Quick Sort function
async function quickSort(arr) {
    steps = [];
    await quickSortHelper(arr, 0, arr.length - 1);
    visualizeArray(steps[currentStep]);
}

// Helper function for Quick Sort
async function quickSortHelper(arr, low, high) {
    if (low < high) {
        const pivotIndex = await partition(arr, low, high);
        await quickSortHelper(arr, low, pivotIndex - 1);
        await quickSortHelper(arr, pivotIndex + 1, high);
    }
}

async function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap
            storeStep(arr);
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // Swap pivot
    storeStep(arr);
    return i + 1;
}

// Merge Sort function
async function mergeSort(arr) {
    steps = [];
    await mergeSortHelper(arr, 0, arr.length - 1);
    visualizeArray(steps[currentStep]); // Initial visualization after the first step
}

// Helper function for Merge Sort
async function mergeSortHelper(arr, left, right) {
    if (left >= right) return; // Base case: If the array has 1 or fewer elements, it's sorted.

    const mid = Math.floor((left + right) / 2);
    
    // Recursively divide the array into two halves
    await mergeSortHelper(arr, left, mid);
    await mergeSortHelper(arr, mid + 1, right);

    // Merge the two halves
    await merge(arr, left, mid, right);
}

// Merge function with visualization
async function merge(arr, left, mid, right) {
    let leftArray = arr.slice(left, mid + 1);
    let rightArray = arr.slice(mid + 1, right + 1);

    let i = 0; // Left index
    let j = 0; // Right index
    let k = left; // Main index to modify the original array

    // Merge the two sorted halves
    while (i < leftArray.length && j < rightArray.length) {
        if (leftArray[i] <= rightArray[j]) {
            arr[k] = leftArray[i];
            i++;
        } else {
            arr[k] = rightArray[j];
            j++;
        }
        k++;
        storeStep([...arr]); // Store the state of the array after each merge step
    }

    // Copy any remaining elements from leftArray
    while (i < leftArray.length) {
        arr[k] = leftArray[i];
        i++;
        k++;
        storeStep([...arr]); // Store the state of the array after each merge step
    }

    // Copy any remaining elements from rightArray
    while (j < rightArray.length) {
        arr[k] = rightArray[j];
        j++;
        k++;
        storeStep([...arr]); // Store the state of the array after each merge step
    }

    visualizeArray(steps[currentStep]); // Visualize after the merge
}

// Bubble Sort function
async function bubbleSort(arr) {
    steps = [];
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Swap
                storeStep(arr);
            }
        }
    }
    visualizeArray(steps[currentStep]);
}

// Heap Sort function
async function heapSort(arr) {
    steps = [];
    let n = arr.length;
    
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(arr, n, i);
    }

    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        [arr[0], arr[i]] = [arr[i], arr[0]];
        storeStep(arr);  // Record the current step
        // Call heapify on the reduced heap
        await heapify(arr, i, 0);
    }
    visualizeArray(steps[currentStep]);  // Final visualization
}

// Heapify function to maintain heap property
async function heapify(arr, n, i) {
    let largest = i;  // Initialize largest as root
    let left = 2 * i + 1;  // Left child index
    let right = 2 * i + 2;  // Right child index

    // If left child is larger than root
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    // If right child is larger than largest so far
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    // If largest is not root
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]]; // Swap
        storeStep(arr);  // Record the current step

        // Recursively heapify the affected subtree
        await heapify(arr, n, largest);
    }
}

// Reset the array to its initial state
function resetArray() {
    arr = [45, 23, 78, 12, 67, 98, 34, 55, 19];
    steps = [];
    currentStep = 0;
    visualizeArray(arr);  // Visualize the reset array
    document.getElementById("nextIterationButton").style.display = 'none'; // Hide the next step button
}

// Show next step in the algorithm
function nextIteration() {
    if (steps.length > 0 && currentStep < steps.length) {
        visualizeArray(steps[currentStep]);
        currentStep++;
    }
}

// Event Listeners for sorting buttons
document.getElementById("quickSortButton").addEventListener("click", function() {
    currentAlgorithm = 'quickSort';
    quickSort([...arr]);
    document.getElementById("nextIterationButton").style.display = 'inline'; // Show the next step button
});

document.getElementById("mergeSortButton").addEventListener("click", function() {
    currentAlgorithm = 'mergeSort';
    mergeSort([...arr]);
    document.getElementById("nextIterationButton").style.display = 'inline'; // Show the next step button
});

document.getElementById("bubbleSortButton").addEventListener("click", function() {
    currentAlgorithm = 'bubbleSort';
    bubbleSort([...arr]);
    document.getElementById("nextIterationButton").style.display = 'inline'; // Show the next step button
});
document.getElementById("heapSortButton").addEventListener("click", function() {
    currentAlgorithm = 'heapSort';
    heapSort([...arr]);  // Pass a fresh copy of the array to heapSort
    document.getElementById("nextIterationButton").style.display = 'inline'; // Show the next step button
});


document.getElementById("resetButton").addEventListener("click", resetArray);

document.getElementById("nextIterationButton").addEventListener("click", nextIteration);

// Initial visualization
visualizeArray(arr);
