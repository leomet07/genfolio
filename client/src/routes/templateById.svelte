
<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400&display=swap" rel="stylesheet">

</svelte:head>

<div class="root">
    <div class="editor">
        <h1 class="header">Editor</h1>
        <div class="divider" />
    </div>
    <div class="preview">
        <h1 class="header">Preview</h1>
    </div>
</div>


<style>
    @import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Monodisplay=swap");

    .root {
        height: 100vh;
        width: 100vw;
        display: flex;

    }
    .editor {
        width: 50%;
        height: 100%;
        background-color: rgb(0, 0, 0);
        display: flex;
        justify-content: center;
    }
    .preview {
        width: 50%;
        height: 100%;
        background-color: #212327;
        display: flex;
        justify-content: center;
    }
    .header {
        color: white;
        font-size: 2em;
        text-align: center;
        font-family: "IBM Plex Mono", sans-serif;
        font-weight: 400;
        margin-top: 3rem;
    }

</style>