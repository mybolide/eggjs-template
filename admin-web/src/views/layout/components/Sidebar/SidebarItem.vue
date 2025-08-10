<template>
  <div v-if="!item.hidden&&item.children" class="menu-wrapper">
    <template v-if="hasOneShowingChild(item.children) && !onlyOneChild.children&&!item.alwaysShow">
      <a :href="onlyOneChild.path" target="_blank" @click="clickLink(onlyOneChild.path,$event)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          {{ child.path }}
          <item v-if="onlyOneChild.meta" :icon="onlyOneChild.meta.icon" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </a>
    </template>

    <el-submenu v-else :index="item.name||item.path">
      <template slot="title">
        <font-awesome-icon :icon="item.icon" />
        <item :title="item.name" />
      </template>

      <template v-for="child in item.children" v-if="!child.hidden">
        <sidebar-item
          v-if="child.children&&child.children.length>0"
          :is-nest="true"
          :item="child"
          :key="child.path"
          :base-path="resolvePath(child.path)"
          class="nest-menu"/>

        <a v-else :href="child.path" :key="child.name" target="_blank" @click="clickLink(child.path,$event)">
          <el-menu-item :index="basePath + '/' +child.path">
            <item :icon="child.icon" :title="child.name" />
          </el-menu-item>
        </a>
      </template>
    </el-submenu>

  </div>
</template>

<script>
import path from 'path'
import { validateURL } from '@/utils/validate'
import Item from './Item'

export default {
  name: 'SidebarItem',
  components: { Item },
  props: {
    // route配置json
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onlyOneChild: null
    }
  },
  methods: {
    hasOneShowingChild(children) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // temp set(will be used if only has one showing child )
          this.onlyOneChild = item
          return true
        }
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    },
    resolvePath(routePath) {
      return this.basePath
    },
    isExternalLink(routePath) {
      return validateURL(routePath)
    },
    clickLink(routePath, e) {
      if (!this.isExternalLink(routePath)) {
        e.preventDefault()
        const path = this.basePath + '/' + routePath
        this.$router.push(path)
      }
    }
  }
}
</script>
<style>
  .svg-inline--fa{
    margin-right: 5px !important;
  }
  .el-menu-item{
    padding-left: 45px !important;
  }
  .el-menu-item{
    color: #f5f5f5 !important;
  }
  .el-submenu__title{
    color: #f5f5f5 !important;
  } 
</style>
