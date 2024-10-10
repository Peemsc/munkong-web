<template>
    <div>
        <button class="btn btn-share" type="button" @click="showModal = true"></button>

        <div class="modal" v-if="showModal" @click="closeModal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">กรุณาเลือกโซเชียลที่ต้องการแชร์</h5>
                        <!-- <button type="button" class="close" @click="showModal = false">
                            <span aria-hidden="true">&times;</span>
                        </button> -->
                    </div>
                    <div class="modal-body">
                        <div class="row justify-content-center">
                            <div class="col-4">
                                <div class="list-inline-item">
                                    <a href="#" @click="shareFacebook">
                                        <img class="social-icon" src="../../assets/img/icon-share/facebook.svg"
                                            alt="Facebook">
                                    </a>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="list-inline-item">
                                    <a href="#" @click="shareTwitter">
                                        <img class="social-icon" src="../../assets/img/icon-share/twitter.svg"
                                            alt="Twitter">
                                    </a>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="list-inline-item">
                                    <a href="#" @click="copyToClipboard">
                                        <img class="social-icon" src="../../assets/img/icon-share/copy-solid.svg"
                                            alt="Copy">
                                    </a>
                                </div>
                            </div>
                            <div class="col-4 d-md-none mt-3">
                                <div class="list-inline-item">
                                    <a href="#" @click="shareMessenger">
                                        <img class="social-icon" src="../../assets/img/icon-share/facebook-messenger.svg"
                                            alt="Messenger">
                                    </a>
                                </div>
                            </div>
                            <div class="col-4 d-md-none mt-3">
                                <div class="list-inline-item">
                                    <a href="#" @click="shareLine">
                                        <img class="social-icon" src="../../assets/img/icon-share/line.svg" alt="Line">
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        detail: { type: Object }
    },
    data() {
        return {
            showModal: false
        };
    },
    methods: {
        closeModal() {
            this.showModal = false;
        },
        shareFacebook() {
            const id = this.detail._id; // รหัสไอดีของหน้ารายละเอียดสินค้า
            window.open('https://www.facebook.com/sharer.php?u=' + encodeURIComponent(`${window.location.origin}/news-detail?n=${id}&openExternalBrowser=1`))
        },
        shareTwitter() {
            const id = this.detail._id; // รหัสไอดีของหน้ารายละเอียดสินค้า
            const url = `${window.location.origin}/news-detail?n=${id}&openExternalBrowser=1`;

            // เปิดหน้าต่างใหม่ของ Twitter เพื่อแชร์ลิงก์
            window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`);
        },
        shareMessenger() {
            const id = this.detail._id; // รหัสไอดีของหน้ารายละเอียดสินค้า
            const url = `${window.location.origin}/news-detail?n=${id}&openExternalBrowser=1`;

            // เปิดหน้าต่างใหม่ของ Messenger เพื่อแชร์ลิงก์
            window.open(`fb-messenger://share/?link=${encodeURIComponent(url)}`);
        },
        shareLine() {
            const id = this.detail._id;
            const url = `${window.location.origin}/news-detail?n=${id}&openExternalBrowser=1`;

            // สร้างลิงก์ deeplink สำหรับแชร์ไปยังแอปพลิเคชัน Line บนเดสก์ท็อป
            const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`;

            // เปิดหน้าต่างใหม่เพื่อแชร์ลิงก์ไปยังแอปพลิเคชัน Line
            window.open(lineUrl);
        },

        copyToClipboard() {
            const id = this.detail._id; // รหัสไอดีของหน้ารายละเอียดสินค้า
            const url = `${window.location.origin}/news-detail?n=${id}`;

            // สร้างตัวแปรสำหรับ <textarea> element
            const textarea = document.createElement('textarea');
            textarea.value = url;

            // เพิ่ม <textarea> element ลงใน DOM
            document.body.appendChild(textarea);

            // เลือกและคัดลอก URL จาก <textarea>
            textarea.select();
            document.execCommand('copy');

            // ลบ <textarea> element ออกจาก DOM
            document.body.removeChild(textarea);

            alert('ลิงก์ถูกคัดลอกลงในคลิปบอร์ดแล้ว');
        },

    }
};
</script>
  


<style scoped>
.btn-share {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.modal {
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-dialog {
    position: relative;
    max-width: 500px;
}

.modal-content {
    background-color: #fff;
    padding: 20px;
}

.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.modal-title {
    margin: 0;
}

.close {
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    font-size: 24px;
}

.modal-body {
    margin-top: 20px;
}

.list-inline {
    list-style: none;
    padding: 0;
    margin: 0;
}

.list-inline-item {
    display: inline-block;
    margin-right: 10px;
}

.list-inline-item:last-child {
    margin-right: 0;
}

.list-inline-item a {
    display: block;
    text-decoration: none;
}

.social-icon {
    width: 60px;
    height: 60px;
}</style>