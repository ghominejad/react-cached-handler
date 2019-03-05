# react-cached-handler
`react-cached-handler` is a tiny library that passes parameters to your event handlers using arrow functions without impacting **rendering performance** of components

### Features
- Named handlers
- Handle events by arrow functions  
- Access to the key, custom arguments and the original event 
- Component rendering performace
- Custom context for handlers

## Download
[![Npm version](https://img.shields.io/npm/v/react-cached-handler.svg)](https://www.npmjs.com/package/react-cached-handler)

### Package Installation
```
$ npm install react-cached-handler
```

### How to use it?
You define a handler by calling `createHandler`. The first parameter is the context of your handler function that is optional
```JAVASCRIPT
handler = createHandler(this)`
```
Now you can set your arrow function in events. The first argument must be a key.
```JAVASCRIPT
<TextField
                label="Title"
                onBlur={this.handler('title', (fieldName, event)=> {} )}
                defaultValue = "default value" />
```
Parameters of the arrow function :
- `fieldName` : The first parameter of the arrow function is allways the key you have specified
- `event` : The second parameter is the original event. So you can access the value by `event.target.value`

You can pass even more arguments but the `event` argument is always the last one :
```JAVASCRIPT
onBlur={this.handler('title', 'a1', 'a2', (fieldName, p1, p2, event)=> { console.log(p1) } )}
```
##### Note : Internally it caches your arrow functions by the specified key, no need to be worried about rerendering!


#### Example 1
`EditPost` Component that handles named events via a default handler function

```JAVASCRIPT
import createHandler from 'react-cached-handler';

class EditPost extends React.PureComponent {

    handler = createHandler(this, (fieldName, e) => { console.log(e.target.value) } );

    render() {
        return <div>
        
            <TextField
                label="Title"
                onBlur={this.handler('title')}
                defaultValue = "default value" />

            <TextField
                label="Author Name"
                onBlur={this.handler('authorName')}
                defaultValue = "default value" />

            <TextField
                label="Post Content"
                onBlur={this.handler('postContent')}
                defaultValue = "default value" />

            <TextField
                label="Post Content"
                onBlur={this.handler('postContent' )}
                defaultValue = "default value" />

        </div>
    }
}
```

- You could also override the default handler function

```JAVASCRIPT
            <TextField
                label="Post Content"
                onBlur={this.handler('postContent', (fieldName, e) => { console.log('from custom handler function')} )}
                defaultValue = "default value" />
```

#### Example 2
`PostMenu` Component that handles selecting tags and posts    

```JAVASCRIPT
import React from 'react';
import createHandler from 'react-cached-handler';

class PostMenu extends React.PureComponent {

    postSelectHandler = createHandler(this);
    tagSelectHandler = createHandler(this);

    render() {
        return <div>
            {
                this.props.posts.map(post =>
                    <Post key={post.id}
                        onClick={this.postSelectHandler(post.id, (postId) => { console.log(postId) })}
                    />)
            }

            {
                this.props.tags.map(tag =>
                    <Tag key={tag}
                        onClick={this.tagSelectHandler(tag, (tag) => { console.log(tag) })}
                    />)
            }
    

        </div>
    }
}
```

#### Example 3
You can also pass more objects as arguments

```JAVASCRIPT
handlePostClick = (postId, title, author) => {
    console.log(author.name)
}

.
.

<Post key={post.id}
    onClick={this.handler(post.id, post.Title, post.Author, this.handlePostClick)}
/>
```

#### Example 4
The original event object is passed as last argument


```JAVASCRIPT
handlePostClick = (postId, title, author, e) => {
    console.log(e.target)
}

.
.

<Post key={post.id}
    onClick={this.handler(post.id, post.Title, post.Author, this.handlePostClick)}
/>
```



#### Example 5
It's ok if you don't assign the key. It uses 'default' for the key


```JAVASCRIPT
nameChangeHandler = createHandler();

.
.

<TextInput key={post.id}
    onChange={this.nameChangeHandler((e)=> {
        console.log(e.target.value);
    })}
/>
```

