var editor = ace.edit("editor");
editor.setTheme("ace/theme/dracula");
editor.session.setMode("ace/mode/assembly_x86");
editor.setValue("org  0x100\nmov  dx, msg\nmov  ah, 9\nint  0x21\nmov  ah, 0x4c\nint  0x21\nmsg  db 'Hello, World!', 0x0d, 0x0a, '$'", -1);
editor.setShowPrintMargin(false);

var code = editor.getValue();
console.log(code);

