## Welcome to xBl0g

*xBl0g* is a fast, simple, minimal "nerd" blog — plain static files, no build step,
no backend. Content lives in Markdown; the browser renders it with a few tiny
vanilla-JS modules. Perfect for embedded boxes and low-power hosts where a heavy
framework would be overkill.

<div class="video">
  <iframe src="https://www.youtube-nocookie.com/embed/dbSAtYwOLUw"
          title="YouTube video" loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
</div>

### Syntax highlighting works out of the box

```lua
local turbo = require("turbo")

local HelloWorldHandler = class("HelloWorldHandler", turbo.web.RequestHandler)

function HelloWorldHandler:get()
    self:write("Hello World!")
end

turbo.web.Application({
    {"/hello", HelloWorldHandler}
}):listen(8888)
turbo.ioloop.instance():start()
```

Head over to the **blog** to read the posts, or **about** to learn how the whole
thing is wired together.
