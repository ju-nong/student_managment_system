<template>
    <div class="nav">
        <router-link to="/">메인</router-link>
        <router-link to="/form">연합 생성</router-link>
        <router-link to="/list">연합 리스트</router-link>
    </div>
    <router-view></router-view>
</template>

<script>
export default {
    name: "App",
};
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
ul {
    list-style: none;
}
a {
    color: #000;
    text-decoration: none;
}
button {
    cursor: pointer;
    transition: all 0.3s;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
.nav {
    padding: 30px 0;
    > a {
        padding: 0 20px;
    }
}
.wrap {
    margin: 20px auto 0 auto;
    max-width: 900px;
    border-radius: 10px;
    border: 1px solid #eee;
    .form {
        padding: 30px;
        display: flex;
        flex-direction: column;
        > button {
            background-color: #3b88c3;
            color: #fff;
            border-radius: 10px;
            font-size: 26px;
            padding: 5px;
            font-weight: bold;
            border-color: transparent;
        }
        > h2 {
            text-align: left;
            border-bottom: 1px solid #999;
            padding-bottom: 10px;
            margin-bottom: 10px;
        }
        > input {
            max-width: 300px;
            padding: 5px 3px;
            margin: 10px 5px;
        }
        > .mInfo {
            display: flex;
            text-align: left;
            padding: 5px;
            font-size: 18px;
            min-height: 36px;
            p:nth-child(1) {
                flex-basis: 10%;
            }
            p:nth-child(2) {
                flex-basis: 1%;
            }
            .nameList {
                flex-basis: 85%;
                > span {
                    display: inline-block;
                    cursor: pointer;
                    border-radius: 5px;
                    border: 2px solid #000;
                    font-size: 14px;
                    font-weight: bold;
                    height: 25px;
                    padding: 0px 5px;
                    margin-left: 10px;
                    transition: all 0.3s;
                }
                > span:hover {
                    color: #ff0000;
                    border-color: #ff0000;
                }
            }
        }
        .commitForm {
            display: flex;
            padding-top: 10px;
            input {
                width: 120px;
                padding: 3px 5px;
                margin: 0px 10px 0px 5px;
            }
        }
    }
}
</style>
