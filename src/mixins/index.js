import Vue from "vue";
import { fbase } from "../firebase";
import $ from "jquery";

// import { mapGetters, mapState } from "vuex";

Vue.mixin({
    computed: {
        // ...mapGetters(["user", "AppId", "RequestId"]),
        // ...mapState(["oxfordvestURL"]),

        isValid() {
            return this.form.email !== "" && this.form.password !== "";
        },
    },

    filters: {
        strippedContent: function (string) {
            return string.replace(/<\/?[^>]+>/gi, " ");
        },
    },

    methods: {
        // capitalizeFirstLetter(str) {
        //     return str.charAt(0).toUpperCase() + str.slice(1);
        // },
        // addComma(value) {
        //     return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        // },
        // AddCammas: function (event) {
        //     event.target.value = event.target.value.replace(",", ".");
        // },
        // removeTimeZone(datestring) {
        //     let finalDate = "";

        //     if (datestring.split("+").length > 1) {
        //         let b = datestring.split("T");
        //         finalDate = b[0];
        //     } else {
        //         let b = datestring.split("T");

        //         if (b.length > 1) {
        //             b.pop();
        //             finalDate = b.join("-");
        //         }
        //     }

        //     return finalDate;
        // },
        // validEmail: function (email) {
        //     var emailReg = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        //     return emailReg.test(email);
        // },

        // getLocalTYime: function (data) {
        //     var d = new Date(data);
        //     return d.toLocaleTimeString().replace(/:\d+ /, " ");
        // },

        // removeUnderScoreFromString: function (str) {
        //     var i,
        //         frags = str.split("_");
        //     for (i = 0; i < frags.length; i++) {
        //         frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
        //     }
        //     return frags.join(" ");
        // },
        // removeDashFromString: function (str) {
        //     var i,
        //         frags = str.split("-");
        //     for (i = 0; i < frags.length; i++) {
        //         frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
        //     }
        //     return frags.join(" ");
        // },

        // formatDate: function (date) {
        //     var d = new Date(date);
        //     var hours = d.getHours();
        //     var minutes = d.getMinutes();
        //     var ampm = hours >= 12 ? "pm" : "am";
        //     hours = hours % 12;
        //     hours = hours ? hours : 12; // the hour '0' should be '12'
        //     minutes = minutes < 10 ? "0" + minutes : minutes;
        //     var strTime = hours + ":" + minutes + " " + ampm;
        //     let returnedDate;

        //     var newD = new Date();

        //     let userdate =
        //         d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
        //     let todaysdate =
        //         newD.getDate() + "/" + (newD.getMonth() + 1) + "/" + newD.getFullYear();

        //     if (userdate === todaysdate) {
        //         returnedDate = "Today, " + strTime;
        //     } else {
        //         returnedDate =
        //             d.getDate() +
        //             "/" +
        //             (d.getMonth() + 1) +
        //             "/" +
        //             d.getFullYear() +
        //             "  " +
        //             strTime;
        //     }

        //     return returnedDate;
        // },

        // serverErrorMessage: function () {
        //     this.setActionLoading(false);
        //     setTimeout(() => {
        //         let payload = {
        //             status: true,
        //             type: "error",
        //             message: "Server Error. Please try again later",
        //         };
        //         this.setAlertModalStatus(payload);
        //     }, 200);
        // },

        // proper way of resetting VueJS data properties to initial values
        resetFormData() {
            // Object.assign(this.$data, this.$options.data.apply(this));

            this.product = {
                name: null,
                price: null,
            };
        },

        login(email, password) {
            fbase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(() => {
                    $("#loginModal").modal("hide");
                    this.$router.replace("/admin");
                })
                .catch(function (error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === "auth/wrong-password") {
                        alert("Wrong password.");
                    } else {
                        alert(errorMessage);
                    }
                    console.log(error);
                });
        },

        registerUser(email, password) {
            fbase
                .auth()
                .createUserWithEmailAndPassword(
                    email,
                    password
                )
                .then(() => {
                    $("#loginModal").modal("hide");
                    // clear field only when its successful
                    this.resetFormData();
                    this.$router.replace("admin");
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode == "auth/weak-password") {
                        alert("The password is too weak.");
                    } else {
                        alert(errorMessage);
                    }
                    console.log(error);
                });

            // this.form = {
            //     fullName: null,
            //     email: null,
            //     password: null,
            // };
        },

        recoverPassword(email) {
            fbase
                .auth()
                .sendPasswordResetEmail(email)
                .then(() => {
                    alert("Password reset email sent!");
                })
                .catch((error) => {
                    // var errorCode = error.code;
                    var errorMessage = error.message;

                    alert(errorMessage);

                    // console.log(error, errorCode, errorMessage);
                });
        },

        logout() {
            fbase
                .auth()
                .signOut()
                .then(() => {
                    this.$router.replace("/");
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
});
