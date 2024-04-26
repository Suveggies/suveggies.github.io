document.addEventListener("DOMContentLoaded", function() {
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    function replaceUrlParam(paramName, paramValue) {
        let url = window.location.href;
        var encodedValue = encodeURIComponent(paramValue);
        var regex = new RegExp('([?&])' + paramName + '=([^&#]*)', 'i');
        if (url.match(regex)) {
            url = url.replace(regex, '$1' + paramName + '=' + encodedValue);
        } else {
            var separator = url.indexOf('?') !== -1 ? '&' : '?';
            url += separator + paramName + '=' + encodedValue;
        }
        return url;
    }

    var indexParam = getParameterByName('index');

    let nav_type = String(window.performance.getEntriesByType("navigation")[0].type);

    window.history.replaceState({}, document.title, replaceUrlParam('index', index));
});

const searchParams = new URLSearchParams(window.location.search);

index = searchParams.get('index');

let text = 
[`
<h2>Welcome to Learning The Basics!</h2>
<p>This course introduces you to the basics of assembly.</p>
<p>Click The Continue Button To Proceed</p>
<p>Or press Ctrl+Enter to Proceed</p>
`,
`
<h2>Introduction and Importance of Assembly</h2>
<p>This section will highlight the importance of learning assembly and will guide you through some different uses of the language.</p>
`
,
`
<h2>Why Should We Learn Assembly?</h2>
<p>There are many uses to learning Assembly from gaining a deeper knowledge of programs to performing malware analysis for large companies.</p>
<p>Let's explore some of these uses a bit more in-depth.</p>
`,
`

    <h2>Low-Level Understanding</h2> 
<p>
    Assembly language provides a deep understanding of how computers work at a fundamental level. It allows programmers to have insights into CPU architecture, memory management, and system-level operations.
</p>
`,
`

    <h2>Performance Optimization</h2>
<p>
    Writing code in Assembly language gives programmers precise control over hardware resources. This level of control enables optimization of critical sections of code for performance, making it essential in high-performance computing, embedded systems, and real-time applications.
</p>
`,
`

    <h2>System-Level Programming</h2>
<p>
    Assembly language is often used for system-level programming tasks such as writing device drivers, operating systems, and firmware. These tasks require direct interaction with hardware components, which Assembly language facilitates.
</p>
`,
`

    <h2>Reverse Engineering</h2>
<p>
    Assembly language is crucial for reverse engineering software and understanding its inner workings. It allows analysts to disassemble executable code, inspect instructions, and understand program behavior at a low level.
</p>
`,
`

    <h2>Security Research</h2>
<p>
    Knowledge of Assembly language is essential for security researchers and practitioners. It helps in identifying vulnerabilities, analyzing malware, and developing exploits. Understanding Assembly language aids in understanding and mitigating security risks effectively.
</p>
`,
`

    <h2>Embedded Systems Development</h2>
<p>
    Assembly language is commonly used in embedded systems programming, where resources are limited, and performance is critical. Writing code directly in Assembly allows developers to optimize code for size and speed, making it suitable for microcontroller-based applications.
</p>
`,
`

    <h2>Legacy Systems Maintenance</h2>
<p>
    Although high-level languages are more commonly used in modern software development, there are still legacy systems and applications written in Assembly language. Knowledge of Assembly is necessary for maintaining and updating such systems.
</p>
`,
`
    <h2>Educational Purposes</h2>
<p>
    Learning Assembly language can be valuable for computer science students to gain a deeper understanding of computer architecture and programming concepts. It provides a bridge between high-level programming languages and the underlying hardware.
</p>
`
,
`
<h2>Basics of Registers</h2>
<p>This section will introduce you to the concept of registers and what they are used for.</p>
`
,
`<h2>Registers in Assembly Language:</h2>
<p>In Assembly language, registers are small storage locations within the CPU that hold data temporarily during program execution. These are the "workhorses" of the processor, used for performing arithmetic and logic operations, storing intermediate results, and holding data that needs to be accessed quickly.</p>
<br>
<h3>Here are some common registers found in x86 Assembly:</h3>

<div class="container">
    <h4>General-Purpose Registers (32-bit):</h4>
    <ul class="reglist">
        <li>EAX (Accumulator)</li>
        <li>EBX (Base)</li>
        <li>ECX (Counter)</li>
        <li>EDX (Data)</li>
    </ul>
    <h4>Index Registers:</h4>
    <ul class="reglist">
        <li>ESI (Source Index)</li>
        <li>EDI (Destination Index)</li>
    </ul>
    <h4>Stack Pointer:</h4>
    <ul class="reglist">
        <li>ESP (Stack Pointer)</li>
    </ul>
    <h4>Base Pointer:</h4>
    <ul class="reglist">
        <li>EBP (Base Pointer)</li>
    </ul>
</div>
<p>These registers have specific roles, but they can also be used interchangeably for various tasks. For instance, EAX is commonly used to store function return values, while ECX might be used as a loop counter.</p>

<p>Registers are generally faster to access than memory locations, making them ideal for frequently accessed or temporary data. However, they have limited storage capacity compared to memory.</p>
`,
`
<h2>Basics of Memory</h2>
<p>This section explains the concept of memory along with highlighting its practical uses</p>
`
,
`
<h3>Memory in Assembly Language:</h3>
<p>Memory, in the context of Assembly language, refers to the system's RAM (Random Access Memory), where data and instructions are stored for the CPU to access. Unlike registers, memory can hold a much larger amount of data, but it is slower to access.</p>

<p>Memory is typically addressed by a unique location called a memory address. Each byte in memory has its own address, allowing the CPU to read from or write to specific locations.</p>

<p>In Assembly, you can interact with memory using instructions like MOV (move data), ADD (addition), SUB (subtraction), and more.</p>

<p>Accessing memory involves specifying the memory address, and the CPU fetches or stores data from that location. Since memory access is slower compared to registers, it's important to minimize memory access in performance-critical code.</p>

<p>Understanding registers and memory is fundamental in Assembly programming. Registers provide fast, temporary storage for computations, while memory offers larger but slower storage for data and instructions. Effective use of both is crucial for writing efficient and functional Assembly programs.</p>
`,
`
<h3>The MOV Operator</h3>
<p>This section introduces you to your first operator - MOV</p>
`
,
`
<h3>The MOV Operation</h3>
<p>This operation can be thought of putting something into a box</p>
<p>The first value acts like the box and the second value acts as the object inside the box</p>
<p>MOV EAX, 10 (Put the value 10 into the EAX register or "box")</p>
<p>MOV EBX, EAX (Store the value that the EAX register is holding into the EBX register)</p>
<p>You can also store data into memory</p>
<p>MOV [memory_address], 10 (This stores the value 10 into the memory address)</p>
<p>MOV [memory_address], EAX (This stores the value inside of the EAX register into the memory address)</p>
`,
`
<h3>Basic Math Operators</h3>
<p>This section gives you some useful functions for adding, subtracting, multiplying, and dividing values</p>
`
,
`
<h3>Basic Math Operations</h3>
<h4>ADD Function</h4>
<p>Adds the second value to the first value</p>
<p>ADD EBX, EAX -- Same as EAX + EBX</p>
<h4>SUB Function</h4>
<p>Subtracts the second value from the first value</p>
<p>SUB EAX, 5 -- Same as 5 - EAX</p>
<h4>INC Function</h4>
<h4>DEC Function</h4>
<h4>IMUL Function</h4>
<p>Multiplies the second value by the third value and stores it in the first value</p>
<p>IMUL ECX, EDX, 2 -- Same as ECX = EDX * 2</p>
<h4>IDIV Function</h4>
<p>Divides the EAX register by the specified value and the quotient is stored in the EAX register and the remainder is stored in the EDX register.</p>
<p>IDIV 8 -- Same as EAX = EAX // 8 and EDX = EAX % 8</p>
`,
`
<h3>Basic Logic Operators</h3>
<p>This section gives you some useful functions for applying logical operations to your values.</p>
`
,
`
<h3>Basic Logic Operations</h3>
<h4>SHL Function</h4>
<h4>SHR Function</h4>
<h4>ROL Function</h4>
<h4>ROR Function</h4>
<h4>AND Function</h4>
<p>Performs bitwise AND between the two values.</p>
<p>AND EAX, EDX</p>
<h4>OR Function</h4>
<p>Performs bitwise OR between the two values.</p>
<p>OR EAX, EDX</p>
<h4>XOR Function</h4>
`,
`
<h3>Introduction to Control Flow</h3>
<p>This section highlights an introduction to the basics of control flow.</p>
<p>This allows you to control the order that your code is executed in.</p>
`,
`
<h3>Introduction to Arrays and Strings</h3>
<h3>This section introduces the idea of arrays and strings on the most basic level.</h3>
`,
`
<h3>How to Use Your Strings</h3>
<p>This section covers functions you can use for basic string manipulation</p>
`,
`
<h4>MOVS Function</h4>
<h4>CMPS Function</h4>
<h4>SCAS Function</h4>
<h4>LODS Function</h4>
`,
`
<h3>Other Data Transfer Functions</h3>
<p>This section explains the XCHG, PUSH, POP, and LEA operators.</p>
`,
`
<h3>Introduction To The Stack</h3>
<p>This section introduces you to one of the most basic and useful data structures.</p>
`,
`
<h3>Setting Functions and Procedures</h3>
<p>This section introduces you to the idea behind functions, why they're useful, and how to implement them.</p>
`,
`
<h3>Exception Handling and Interrupts</h3>
<p>This section introduces you to interrupts and error handling.</p>
`,
`
<h3>Input and Output</h3>
<p>This section teaches you how to take in user input and send output to the user</p>
`
,
`
<h3>Memory Management</h3>
<p>This section introduces you to the idea of memory management and how to optimize your memory usage</p>
`,
`
<h3>Optimization Techniques</h3>
<p>This section teaches you how to optimize your code so it can run as efficient as possible.</p>
`
]

const button1 = document.getElementById('continue');
const button2 = document.getElementById('previous');
const textElement = document.getElementById('text');

text.onload = loadText(index);
button1.addEventListener('click', onButton1Click);
button2.addEventListener('click', onButton2Click);

var url = new URL("http://localhost:8000/Desktop/AssemblyRequired/basics.html?index=0");

function loadText(startIndex) {
    textElement.innerHTML = text[startIndex];
}

function onButton1Click() {
    if(index < text.length-1){
        index++;
        textElement.innerHTML = text[index];
        url.searchParams.set('index', index);
        window.history.replaceState({}, '', url);
    }
}

function onButton2Click() {
    if(index > 0 ){
        index--;
        textElement.innerHTML = text[index];
        url.searchParams.set('index', index);
        window.history.replaceState({}, '', url);
    }
}

function doc_keyUp(e) {
    if (e.ctrlKey && e.code === 'Enter') {
        onButton1Click();
    }
}

document.addEventListener('keyup', doc_keyUp, false);

function doc_keyUp2(e) {
    if (e.ctrlKey && e.code === 'Backspace') {
        onButton2Click();
    }
}

document.addEventListener('keyup', doc_keyUp2, false);



