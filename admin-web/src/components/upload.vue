<template>
    <el-upload class="avatar-uploader" ref="uploadRef" action="" :http-request="customUpload" multiple
        :show-file-list="false" :before-upload="beforeUpload" :on-success="handleSuccess" :on-error="handleError"
        list-type="text" v-loading="loading">
        <template v-if="type === 'image'">
            <el-image v-if="localFileUrl" class="avatar" :src="localFileUrl" fit="contain ">
                <!-- :preview-src-list="[localFileUrl]"> -->
            </el-image>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </template>
        <template v-if="type === 'video'">
            <!-- <el-image v-if="localFileUrl" class="avatar" :src="localFileUrl" fit="contain ">
          
            </el-image> -->
            <video v-if="localFileUrl" class="avatar" :src="localFileUrl" controls="controls" autoplay="autoplay" muted="muted" loop="loop">
                Your browser does not support the video tag.
            </video>

            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </template>
    </el-upload>
</template>
<script>
import { uploadFilePath, fileViewUrl } from '@/api/upload'
import { getToken } from '@/utils/auth'
import axios from 'axios'
export default {
    name: 'upload-components',
    props: {
        type: {
            type: String,
            default: 'image'
        }
        ,
        maxFileSize: {
            type: Number,
            default: 5 * 1024 * 1024
        },
        allowedTypes: {
            type: Array,
            default: () => ['jpg', 'png', 'jepg']
        },
        fileUrl: { // 父组件传入的图片地址
            type: String,
            default: ''
        }
    },
    data() {
        return {
            fileViewUrl,
            loading: false,
            localFileUrl: ''
        }
    },
    watch: {
        fileUrl(newVal) {
            console.info(newVal)
            this.localFileUrl = newVal
        },
    },
    mounted() {
        console.info('mounted triggered:', this.fileUrl);
        this.localFileUrl = this.fileUrl; // 手动触发初始化赋值
    },
    methods: {
        // 上传前校验文件
        beforeUpload(file) {
            const extension = file.name.split('.').pop().toLowerCase();
            if (!this.allowedTypes.includes(extension)) {
                this.$message.error(`Only ${this.allowedTypes.join('/')} file types are supported`);
                return false;
            }
            if (file.size > this.maxFileSize) {
                this.$message.error(`File size cannot exceed ${this.maxFileSize / 1024 / 1024}MB!`);
                return false;
            }
            return true;
        },

        // 自定义上传逻辑
        customUpload(options) {
            const formData = new FormData();
            formData.append('file', options.file);
            this.loading = true

            // 自定义上传的接口地址和请求头
            axios
                .post(uploadFilePath, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'authentication': getToken(), // 可选，若需要鉴权
                    },
                })
                .then((response) => {
                    if (response.status === 200) {
                        options.onSuccess(response.data, options.file); // 上传成功回调
                    } else {
                        options.onError(response.data); // 上传失败回调
                    }
                    this.loading = false
                })
                .catch((error) => {
                    options.onError(error); // 处理异常
                    this.loading = false
                });
        },

        // 上传成功回调
        handleSuccess(response, file) {
            this.$message.success(`uploaded successfully!`);
            if (response.code * 1 === 1) {
                this.localFileUrl = response.data
                this.$emit('success', response.data)
            }
        },

        // 上传失败回调
        handleError(error, file) {
            this.$message.error(`${file.name} upload failed, please try again!`);
            console.error('Upload failed error:', error);
        },
    }

}
</script>


<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
