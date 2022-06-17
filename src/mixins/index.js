import Vue from "vue";
import { fbase } from "../firebase";
import $ from "jquery";
import Swal from "sweetalert2";
import Toast from "sweetalert2";

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
        strippedContent(string) {
            return string.replace(/<\/?[^>]+>/gi, " ");
        },

        capitalizeFirstLetter(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        },
    },

    methods: {
        notificationToast(payload) {
            Toast.fire({
                icon: payload.icon,
                title: payload.title,
                text: payload.text,
                position: 'top-end',
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            });
        },

        removeComma(value) {
            value = value.replace(",", "");
            return value;
        },

        addHash(value) {
            if (value.length > 0) {
                if (value === ",") {
                    return true;
                } else {
                    return value = '#' + value;
                }
            }
        },

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
        resetProductDetails() {
            this.product = {
                name: null,
                description: null,
                price: null,
                tags: null,
                images: null,
            };
            this.tagInput = null;
            this.tagsArray = [];
            this.imageObj = null;
            this.imageArray = [];
        },

        resetFormData() {
            // Object.assign(this.$data, this.$options.data.apply(this));

            this.form = {
                fullName: "",
                email: "",
                password: "",
            };
        },

        login(email, password) {
            fbase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(() => {
                    $("#loginModal").modal("hide");

                    Toast.fire({
                        icon: "success",
                        title: "Login successful!",
                        text: "Redirecting to admin page...",
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 4000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    }).then(() => {
                        this.$router.replace("/admin");
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    let title, errorMessage;

                    if (errorCode == "auth/wrong-password") {
                        title = "Wrong password!";
                        errorMessage = null;
                    } else {
                        title = "Login failed!";
                        errorMessage = error.message;
                    }

                    const payload = {
                        icon: "error",
                        title: title,
                        text: errorMessage,
                    };

                    this.notificationToast(payload);
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
                    this.resetFormData();

                    const payload = {
                        icon: "success",
                        title: "Registration successful!",
                        text: "Please login.",
                    };
                    this.notificationToast(payload);
                    // this.$router.replace("/admin");
                })
                .catch((error) => {
                    const errorCode = error.code;
                    let title, errorMessage;

                    if (errorCode == "auth/weak-password") {
                        title = "Password too weak!";
                        errorMessage = null;
                    } else {
                        title = "Registration failed!";
                        errorMessage = error.message;
                    }

                    const payload = {
                        icon: "error",
                        title: title,
                        text: errorMessage,
                    };
                    this.notificationToast(payload);
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
                    const payload = {
                        icon: "success",
                        title: "Password reset email sent!",
                        text: null,
                    };
                    this.notificationToast(payload);
                })
                .catch((error) => {
                    const payload = {
                        icon: "error",
                        title: error.message,
                        text: null,
                    };
                    this.notificationToast(payload);
                    // console.log(error);
                });
        },

        logout() {
            Swal.fire({
                title: "Are you sure?",
                text: "You will be logged out of the admin page!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#0d6cfd",
                cancelButtonColor: "#dc3545",
                confirmButtonText: "Yes, Logout!",
            }).then((result) => {
                if (result.isConfirmed) {
                    fbase
                        .auth()
                        .signOut()
                        .then(() => {
                            this.$router.replace("/");
                        })
                        .catch((error) => {
                            const payload = {
                                icon: "error",
                                title: error.message,
                                text: null,
                            };
                            this.notificationToast(payload);
                            // console.log(error);
                        });
                }
            });
        },

        generateUniqueId(fileName) {
            let d = new Date();
            let year = d.getFullYear(),
                month = d.getMonth() + 1,
                day = d.getDate(),
                hours = d.getHours(),
                minutes = d.getMinutes(),
                seconds = d.getSeconds();

            let dateOutput = `${day}-${month}-${year} | ${hours}:${minutes}:${seconds}`;
            return `${fileName}__${dateOutput}`;
        },
    },
});
