<template>
  <div class="tw-pt-6 tw-block md:tw-flex">
    <div
      class="tw-flex tw-flex-1 tw-relative tw-border-solid tw-border-2 tw-border-gray-500 tw-p-4 tw-text-18px tw-pr-130px "
    >
      <div class="tw-text-left">{{ family.lastname }}&nbsp;{{ family.name }}&nbsp;{{ family.middlename }}</div>
    </div>
    <div class="tw-flex sm:tw-w-full tw-pt-4 md:tw-pt-0 md:tw-w-1/3 lg:tw-w-1/3 xl:tw-w-1/4 tw-pb-8 md:tw-pb-0">
      <div class="tw-pl-0 md:tw-pl-4 tw-w-1/2">
        <router-link
          tag="div"
          :to="{ path: `/family/${family.id}?type=read` }"
          class="tw-w-full tw-h-full"
        >
          <PlainButton class="tw-w-full tw-h-full">
            <div slot="text">Подробнее</div>
          </PlainButton>
        </router-link>
      </div>
      <div class="tw-pl-4 tw-w-1/2">
        <PlainButton class="danger tw-w-full tw-h-full" @click.native="$emit('on-remove', family.id)">
          <div slot="text">Удалить</div>
        </PlainButton>
      </div>
    </div>
  </div>
</template>
<script>
import PlainButton from '@src/components/ui/Button.vue'
export default {
  name: 'FamilyItem',
  components: {
    PlainButton
  },
  props: {
    family: {
      default: () => ({}),
      type: Object
    }
  },
}
</script>
