<template>
    <header class="header">
        <!-- top navbar -->
        <nav class="navbar navbar-top-bar navbar-static-top">
            <div class="container">
                <ul class="navbar-nav nav">
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li class="disabled"><a href="index.html">About Us</a></li>
                </ul>
                <ul class="navbar-nav nav navbar-right">
                    <li class="disabled"><a href="#">Login</a></li>
                </ul>
            </div>
        </nav>

        <!-- main navigation -->
        <div class="yamm navbar navbar-default navbar-default-book animate-dropdown" role="navigation">
            <div class="container">
                <div class="header-mast">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#KYbook-navbar">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>

                        <a class="navbar-brand" :href="'/'">
                            <img class="logo" src="../static/book-flat.png">
                            <span class="title">Quick Start Books</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>

    </header>
</template>

<script>
export default {

}
</script>
