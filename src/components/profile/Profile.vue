<template>
    <section class="profile pt-5">
        <div class="profile-content">
            <ul class="nav nav-pills" id="updateProfileTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button
                        type="button"
                        class="nav-link active"
                        id="profile-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#profile"
                        role="tab"
                        aria-controls="profile"
                        aria-selected="true"
                    >
                        Profile
                    </button>
                </li>

                <li class="nav-item" role="presentation">
                    <button
                        type="button"
                        class="nav-link"
                        id="account-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#account"
                        role="tab"
                        aria-controls="account"
                        aria-selected="false"
                    >
                        Account Settings
                    </button>
                </li>
            </ul>

            <div class="tab-content" id="updateProfileTabContent">
                <div
                    class="tab-pane fade show active pt-3"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                >
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <input
                                    type="text"
                                    name=""
                                    placeholder="Full name"
                                    class="form-control"
                                    v-model="profile.name"
                                />
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-group">
                                <input
                                    type="text"
                                    placeholder="Phone"
                                    class="form-control"
                                    v-model="profile.phone"
                                />
                            </div>
                        </div>

                        <div class="col-md-12">
                            <div class="form-group">
                                <input
                                    type="text"
                                    placeholder="Address"
                                    class="form-control"
                                    v-model="profile.address"
                                />
                            </div>
                        </div>

                        <div class="col-md-8">
                            <div class="form-group">
                                <input
                                    type="text"
                                    placeholder="Postcode"
                                    class="form-control"
                                    v-model="profile.postCode"
                                />
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="form-group">
                                <input
                                    type="submit"
                                    value="Save Changes"
                                    class="btn btn-primary w-100"
                                    @click="updateProfile"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    class="tab-pane fade pt-3"
                    id="account"
                    role="tabpanel"
                    aria-labelledby="account-tab"
                >
                    <div class="row">
                        <div class="col-xl-6">
                            <div class="alert alert-info">
                                Please use the "Get a reset email" button for
                                reseting the password. The form doens't work
                                currently.
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <input
                                    type="text"
                                    placeholder="User name"
                                    class="form-control"
                                    v-model="account.name"
                                />
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-group">
                                <input
                                    type="text"
                                    placeholder="Email address"
                                    class="form-control"
                                    v-model="account.email"
                                />
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-group">
                                <input
                                    type="text"
                                    placeholder="New password"
                                    class="form-control"
                                    v-model="account.password"
                                />
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-group">
                                <input
                                    type="text"
                                    placeholder="Confirm password"
                                    class="form-control"
                                    v-model="account.confirmPassword"
                                />
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-group">
                                <input
                                    type="file"
                                    class="form-control"
                                    @change="uploadImage"
                                />
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <input
                                    type="submit"
                                    value="Update account"
                                    class="btn btn-primary w-100"
                                    @click="updateAccount"
                                />
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="form-group">
                                <input
                                    type="button"
                                    value="Get a reset email"
                                    class="btn btn-success w-100"
                                    @click="recoverPassword"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
// import { VueEditor } from "vue2-editor";
import { fbase, db } from "../../firebase";

export default {
    components: {
        // VueEditor,
    },

    // props: {
    //     msg: String,
    // },

    data() {
        return {
            profile: {
                name: null,
                phone: null,
                address: null,
                postcode: null,
            },

            account: {
                name: null,
                email: null,
                photoUrl: null,
                emailVerified: null,
                password: null,
                confirmPassword: null,
                uid: null,
            },
        };
    },

    firestore() {
        const user = fbase.auth().currentUser;
        return {
            profile: db.collection("profiles").doc(user.uid),
        };
    },

    methods: {
        recoverPassword() {
            const auth = fbase.auth();
            this.recover(auth.currentUser.email);
        },

        updateProfile() {
            this.$firestore.profile.update(this.profile);

            // console.log(this.profile);

            const payload = {
                icon: "success",
                title: "Profile updated!",
                text: null,
            };
            this.notificationToast(payload);
        },

        updateAccount() {
            this.$firestore.profile.update(this.profile);

            const payload = {
                icon: "success",
                title: "Profile updated!",
                text: null,
            };
            this.notificationToast(payload);
        },

        uploadImage() {},
    },

    mounted() {
        this.account.name = this.profile.name;
    },
    created() {},
};
</script>

<style scoped lang="scss">
</style>
