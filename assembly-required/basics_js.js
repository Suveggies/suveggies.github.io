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
Welcome to Learning The Basics!
This course introduces you to the basics of assembly.
Click The Continue Button To Proceed
Or press Ctrl+Enter to Proceed
`,
`
Introduction and Importance of Assembly
This section will highlight the importance of learning assembly and will guide you through some different uses of the language.
`
,
`
Why Should We Learn Assembly?
There are many uses to learning Assembly from gaining a deeper knowledge of programs to performing malware analysis for large companies.
Let's explore some of these uses a bit more in-depth.
`,
`

    Low-Level Understanding 

    Assembly language provides a deep understanding of how computers work at a fundamental level. It allows programmers to have insights into CPU architecture, memory management, and system-level operations.

`,
`

    Performance Optimization

    Writing code in Assembly language gives programmers precise control over hardware resources. This level of control enables optimization of critical sections of code for performance, making it essential in high-performance computing, embedded systems, and real-time applications.

`,
`

    System-Level Programming

    Assembly language is often used for system-level programming tasks such as writing device drivers, operating systems, and firmware. These tasks require direct interaction with hardware components, which Assembly language facilitates.

`,
`

    Reverse Engineering

    Assembly language is crucial for reverse engineering software and understanding its inner workings. It allows analysts to disassemble executable code, inspect instructions, and understand program behavior at a low level.

`,
`

    Security Research

    Knowledge of Assembly language is essential for security researchers and practitioners. It helps in identifying vulnerabilities, analyzing malware, and developing exploits. Understanding Assembly language aids in understanding and mitigating security risks effectively.

`,
`

    Embedded Systems Development

    Assembly language is commonly used in embedded systems programming, where resources are limited, and performance is critical. Writing code directly in Assembly allows developers to optimize code for size and speed, making it suitable for microcontroller-based applications.

`,
`

    Legacy Systems Maintenance

    Although high-level languages are more commonly used in modern software development, there are still legacy systems and applications written in Assembly language. Knowledge of Assembly is necessary for maintaining and updating such systems.

`,
`
    Educational Purposes

    Learning Assembly language can be valuable for computer science students to gain a deeper understanding of computer architecture and programming concepts. It provides a bridge between high-level programming languages and the underlying hardware.

`
,
`
Basics of Registers
This section will introduce you to the concept of registers and what they are used for.
`
,
`Registers in Assembly Language:
In Assembly language, registers are small storage locations within the CPU that hold data temporarily during program execution. These are the "workhorses" of the processor, used for performing arithmetic and logic operations, storing intermediate results, and holding data that needs to be accessed quickly.

Here are some common registers found in x86 Assembly:

    General-Purpose Registers (32-bit):
        EAX (Accumulator)
        EBX (Base)
        ECX (Counter)
        EDX (Data)
    
    Index Registers:
        ESI (Source Index)
        EDI (Destination Index)
    
    Stack Pointer:
        ESP (Stack Pointer)
    
    Base Pointer:
        EBP (Base Pointer)
    
These registers have specific roles, but they can also be used interchangeably for various tasks. For instance, EAX is commonly used to store function return values, while ECX might be used as a loop counter.

Registers are generally faster to access than memory locations, making them ideal for frequently accessed or temporary data. However, they have limited storage capacity compared to memory.
`,
`
Basics of Memory
This section explains the concept of memory along with highlighting its practical uses
`
,
`
Memory in Assembly Language:
Memory, in the context of Assembly language, refers to the system's RAM (Random Access Memory), where data and instructions are stored for the CPU to access. Unlike registers, memory can hold a much larger amount of data, but it is slower to access.

Memory is typically addressed by a unique location called a memory address. Each byte in memory has its own address, allowing the CPU to read from or write to specific locations.

In Assembly, you can interact with memory using instructions like MOV (move data), ADD (addition), SUB (subtraction), and more.

Accessing memory involves specifying the memory address, and the CPU fetches or stores data from that location. Since memory access is slower compared to registers, it's important to minimize memory access in performance-critical code.

Understanding registers and memory is fundamental in Assembly programming. Registers provide fast, temporary storage for computations, while memory offers larger but slower storage for data and instructions. Effective use of both is crucial for writing efficient and functional Assembly programs.
`,
`
The MOV Operator
This section introduces you to your first operator - MOV
`
,
`
The MOV Operation
This operation can be thought of putting something into a box
The first value acts like the box and the second value acts as the object inside the box
MOV EAX, 10 (Put the value 10 into the EAX register or "box")
MOV EBX, EAX (Store the value that the EAX register is holding into the EBX register)
You can also store data into memory
MOV [memory_address], 10 (This stores the value 10 into the memory address)
MOV [memory_address], EAX (This stores the value inside of the EAX register into the memory address)
`,
`
Basic Math Operators
This section gives you some useful functions for adding, subtracting, multiplying, and dividing values
`
,
`
Basic Math Operations
ADD Function
Adds the second value to the first value
ADD EBX, EAX -- Same as EAX + EBX
SUB Function
Subtracts the second value from the first value
SUB EAX, 5 -- Same as 5 - EAX
INC Function
DEC Function
IMUL Function
Multiplies the second value by the third value and stores it in the first value
IMUL ECX, EDX, 2 -- Same as ECX = EDX * 2
IDIV Function
Divides the EAX register by the specified value and the quotient is stored in the EAX register and the remainder is stored in the EDX register.
IDIV 8 -- Same as EAX = EAX // 8 and EDX = EAX % 8
`,
`
Basic Logic Operators
This section gives you some useful functions for applying logical operations to your values.
`
,
`
Basic Logic Operations
SHL Function
SHR Function
ROL Function
ROR Function
AND Function
Performs bitwise AND between the two values.
AND EAX, EDX
OR Function
Performs bitwise OR between the two values.
OR EAX, EDX
XOR Function
`,
`
Introduction to Control Flow
This section highlights an introduction to the basics of control flow.
This allows you to control the order that your code is executed in.
`,
`
Introduction to Arrays and Strings
This section introduces the idea of arrays and strings on the most basic level.
`,
`
How to Use Your Strings
This section covers functions you can use for basic string manipulation
`,
`
MOVS Function
CMPS Function
SCAS Function
LODS Function
`,
`
Other Data Transfer Functions
This section explains the XCHG, PUSH, POP, and LEA operators.
`,
`
Introduction To The Stack
This section introduces you to one of the most basic and useful data structures.
`,
`
Setting Functions and Procedures
This section introduces you to the idea behind functions, why they're useful, and how to implement them.
`,
`
Exception Handling and Interrupts
This section introduces you to interrupts and error handling.
`,
`
Input and Output
This section teaches you how to take in user input and send output to the user
`
,
`
Memory Management
This section introduces you to the idea of memory management and how to optimize your memory usage
`,
`
Optimization Techniques
This section teaches you how to optimize your code so it can run as efficient as possible.
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
    textElement.innerText = text[startIndex];
}

function onButton1Click() {
    if(index < text.length-1){
        index++;
        textElement.innerText = text[index];
        url.searchParams.set('index', index);
        window.history.replaceState({}, '', url);
    }
}

function onButton2Click() {
    if(index > 0 ){
        index--;
        textElement.innerText = text[index];
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



