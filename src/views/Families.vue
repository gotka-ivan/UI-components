<template>
  <div class="tw-py-10 tw-container tw-m-auto tw-p-10">
    <div class="sm:tw-flex tw-justify-between">
      <div class="tw-text-26px tw-text-blue-700">Семья</div>
      <router-link
        tag="div"
        :to="{ name: 'family-add' }"
        class="tw-w-full tw-pt-4 sm:tw-pt-0  sm:tw-w-1/2 md:tw-w-1/3 lg:tw-w-1/3 xl:tw-w-1/4 sm:tw-pl-4"
      >
        <PlainButton class="tw-w-full tw-h-full add yellow">
          <div slot="text">Добавить запись</div>
        </PlainButton>
      </router-link>
    </div>
    <div>
      <FamilyItem
        v-for="(family, index) in $store.state.family.familyList"
        :key="index"
        :family="family"
        @on-remove="onRemove"
      />
    </div>
    <PlainModal :show.sync="isActiveRemoveModal" size="lg">
      <div slot="title" class="tw-flex tw-justify-center">
        <Alert :size="100" />
      </div>
      <div
        slot="body"
        class="tw-flex tw-justify-center tw-text-center tw-text-16px tw-text-gray-700 dark:tw-text-black"
      >
        Вы действительно хотите удалить выбранную запись?
      </div>
      <div slot="footer" class="tw-flex tw-justify-center tw-pt-6">
        <div @click="isActiveRemoveModal = false">
          <PlainButton>
            <div slot="text">Отмена</div>
          </PlainButton>
        </div>
        <div class="tw-pl-6" @click="remove">
          <PlainButton class="danger">
            <div slot="text">Удалить</div>
          </PlainButton>
        </div>
      </div>
    </PlainModal>
  </div>
</template>
<script>
import FamilyItem from '@src/components/family/FamilyItem.vue'
import PlainButton from '@src/components/ui/Button.vue'
import PlainModal from '@src/components/ui/modals/PlainModal.vue'
import Alert from 'vue-material-design-icons/Alert.vue'
export default {
  name: 'ProfileFamily',
  components: {
    FamilyItem,
    PlainButton,
    PlainModal,
    Alert
  },
  data() {
    return {
      isActiveRemoveModal: false,
      removeId: 0
    }
  },
  methods: {
    async remove() {
      const responseStatus = await this.$store.dispatch('family/deleteFamily', this.removeId)
      if (responseStatus) {
        this.$store.dispatch('openGlobalAlert', {
          message: 'Член семьи удалён',
          type: 'success'
        })
        this.isActiveRemoveModal = false
      } else {
        this.$store.dispatch('openGlobalAlert', {
          message: 'Ошибка удаления',
          type: 'error'
        })
      }
    },
    onRemove(id) {
      this.removeId = id
      this.isActiveRemoveModal = true
    }
  }
}
</script>
<style lang="less" scoped>


</style>
