---
title: Lorem Ipsum 1
date: 2011-11-03
author: estebanSannin
slug: lorem-ipsum-1
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquet volutpat
vestibulum. Donec non mi sit amet quam feugiat porta congue eget quam. Mauris
euismod rutrum lorem ut interdum. Cras consequat nisl at sollicitudin aliquam.
Aliquam vel augue aliquam, luctus urna sit amet, posuere libero.

Orci varius natoque penatibus et magnis dis parturient montes, nascetur
ridiculus mus. Suspendisse at semper arcu. Proin vehicula placerat tincidunt.
Pellentesque non eleifend tortor. Suspendisse faucibus vel risus et feugiat.

### JavaScript code example

```javascript
import { marked } from "../vendor/marked.esm.js";

const html = marked.parse("# Hello **world**");
console.log("MARKDOWN RESULT:", html);
```

### C code example

```c
#include <stdio.h>

int main(void)
{
    int    integerType;
    float  floatType;
    double doubleType;
    char   charType;

    // sizeof reports the storage size of each type
    printf("Size of int:    %zu bytes\n", sizeof(integerType));
    printf("Size of float:  %zu bytes\n", sizeof(floatType));
    printf("Size of double: %zu bytes\n", sizeof(doubleType));
    printf("Size of char:   %zu byte\n",  sizeof(charType));

    return 0;
}
```
