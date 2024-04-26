const searchParams = new URLSearchParams(window.location.search);

for (const param of searchParams) {
    console.log(param);
  }
