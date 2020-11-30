<template>
  <div>
    <div class="tw-container tw-m-auto tw-pt-10">
      <div class="tw-bg-white tw-px-10">
        <div class="tw-py-10 tw-flex tw-items-center tw-border-solid tw-border-b tw-border-gray-500">
          <router-link tag="div" :to="{ name: 'families' }" class="tw-cursor-pointer">
            <ArrowLeft sire="26" />
          </router-link>
          <div class="tw-pl-4 tw-text-26px tw-font-semibold tw-text-blue-700">Семья</div>
        </div>
        <div class="tw-py-10">
          <div>
            <div
              v-if="pageType() === PAGE_TYPES.READ"
              class="tw-text-20px tw-font-semibold sm:tw-flex tw-justify-between tw-text-blue-700"
            >
              <div class="md:tw-flex tw-w-full tw-pt-12 sm:tw-pt-0 sm:tw-w-1/3 md:tw-w-auto">
                <div>
                  <PlainButton class="tw-text-blue-700 danger tw-w-full" @click="state.isActiveRemoveModal = true">
                    <div slot="text">Удалить запись</div>
                  </PlainButton>
                </div>

                <router-link
                  tag="div"
                  :to="{ path: `/family/${familyInfo.id}?type=edit` }"
                  class="md:tw-pl-6 tw-pt-6 md:tw-pt-0"
                >
                  <PlainButton class="tw-text-blue-700 tw-w-full">
                    <div slot="text">Редактировать</div>
                  </PlainButton>
                </router-link>
              </div>
            </div>
            <form class="tw-pt-12 tw-flex tw-flex-wrap" @submit.prevent="onSubmit">
              <div class="tw-w-full sm:tw-w-1/3 tw-pb-8">
                <TextInput
                  id="name"
                  v-model="familyInfo.name"
                  name="lastname"
                  :readonly="pageType() === PAGE_TYPES.READ"
                  :config="state.textConfig"
                  :invalid="$v.familyInfo.name.$dirty && !$v.familyInfo.name.required"
                >
                  <div slot="label">Имя</div>
                </TextInput>
              </div>
              <div class="tw-w-full sm:tw-w-1/3 tw-pb-8 sm:tw-pl-8">
                <TextInput
                  id="lastname"
                  v-model="familyInfo.lastname"
                  name="lastname"
                  :readonly="pageType() === PAGE_TYPES.READ"
                  :config="state.textConfig"
                  :invalid="$v.familyInfo.lastname.$dirty && !$v.familyInfo.lastname.required"
                >
                  <div slot="label">Фамилия</div>
                </TextInput>
              </div>
              <div class="tw-w-full sm:tw-w-1/3 tw-pb-8 sm:tw-pl-8">
                <TextInput
                  id="firstname"
                  v-model="familyInfo.middlename"
                  name="firstname"
                  :readonly="pageType() === PAGE_TYPES.READ"
                  :config="state.textConfig"
                  :invalid="$v.familyInfo.middlename.$dirty && !$v.familyInfo.middlename.required"
                >
                  <div slot="label">Отчество</div>
                </TextInput>
              </div>
              <div v-if="pageType() === PAGE_TYPES.ADD || pageType() === PAGE_TYPES.EDIT" class="tw-w-full">
                <div class="tw-pt-10">
                  <Checkbox
                    id="isAgree"
                    v-model="state.isAgree"
                    name="isAgree"
                    :invalid="$v.state.isAgree.$dirty && !$v.state.isAgree.$model"
                  >
                    <div slot="label">
                      Я согласен на обработку персональных данных членов моей семьи
                    </div>
                  </Checkbox>
                </div>
                <div class="tw-text-16px tw-pt-4 tw-text-left dark:tw-text-black">
                  В соответствии с ФЗ от 27.07.2006 № 152-ФЗ "О персональных данных" Вы даёте согласие на обработку
                  указанных персональных данных способами, включающими в себя связь с Вами с помощью средств связи.
                  Оператор ГИС ЕКП гарантирует конфиденциальность и сохранность предоставленных Вами сведений.
                </div>
                <div class="tw-pt-10 tw-flex">
                  <PlainButton class="dark:tw-text-lg white" @click="cancel">
                    <div slot="text">Отмена</div>
                  </PlainButton>
                  <PlainButton type="submit" :class="['tw-ml-6', pageType() === PAGE_TYPES.ADD && 'yellow']">
                    <div slot="text">
                      {{ pageType() | buttonText }}
                    </div>
                  </PlainButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <PlainModal :show.sync="state.isActiveRemoveModal" size="lg">
      <div slot="title" class="tw-flex tw-justify-center">
        <Alert :size="100" />
      </div>
      <div
        slot="body"
        class="tw-flex tw-justify-center tw-text-16px tw-text-center tw-text-gray-700 dark:tw-text-black"
      >
        Вы действительно хотите удалить выбранную запись?
      </div>
      <div slot="footer" class="tw-flex tw-justify-center tw-pt-6">
        <div @click="state.isActiveRemoveModal = false">
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
    <PlainModal :show.sync="state.isActiveInfoModal" size="lg">
      <div slot="title" class="tw-flex tw-justify-center">
        <Alert :size="100" />
      </div>
      <div
        slot="body"
        class="tw-flex tw-justify-center tw-text-center tw-text-16px tw-text-gray-700 dark:tw-text-black"
      >
        {{ state.infoModalMessage }}
      </div>
      <div slot="footer" class="tw-flex tw-justify-center tw-pt-6">
        <PlainButton class="yellow tw-w-1/3" @click.native="state.isActiveInfoModal = false">
          <div slot="text">ОК</div>
        </PlainButton>
      </div>
    </PlainModal>
  </div>
</template>
<script>
import ArrowLeft from 'vue-material-design-icons/ArrowLeft.vue'
import PlainModal from '@src/components/ui/modals/PlainModal.vue'
import PlainButton from '@src/components/ui/Button.vue'
import TextInput, { Config as TextConfig } from '@src/components/ui/inputs/TextInput.vue'
import Checkbox from '@src/components/ui/inputs/Checkbox.vue'
import Alert from 'vue-material-design-icons/Alert.vue'
import { required } from 'vuelidate/lib/validators'

const PAGE_TYPES = {
  READ: 'READ',
  EDIT: 'EDIT',
  ADD: 'ADD'
}

export default {
  name: 'Family',
  filters: {
    headText: function(pageType) {
      switch (pageType) {
        case 'ADD':
          return 'Добавить члена семьи'
        case 'EDIT':
          return 'Редактировать'
        default:
          return ''
      }
    },
    buttonText: function(pageType) {
      switch (pageType) {
        case 'ADD':
          return 'Добавить'
        case 'EDIT':
          return 'Сохранить'
        default:
          return ''
      }
    },
  },
  validations: {
    familyInfo: {
      name: {
        required
      },
      lastname: {
        required
      },
      middlename: {
        required
      }
    },
    state: {
      isAgree: {
        required
      }
    }
  },
  components: {
    ArrowLeft,
    PlainButton,
    TextInput,
    Checkbox,
    PlainModal,
    Alert
  },
  data() {
    return {
      PAGE_TYPES,
      state: {
        textConfig: new TextConfig(true),
        isActiveRemoveModal: false,
        isActiveInfoModal: false,
        infoModalMessage: '',
        isAgree: false
      }
    }
  },
  computed: {
    familyInfo: {
      get: function() {
        return this.$store.state.family.familyInfo
      },
      set: function(newValue) {
        this.$store.state.commit('setFamilyInfo', newValue)
      }
    },
    docsOptions: {
      get: function() {
        return this.$store.state.family.docsList
      }
    }
  },
  methods: {
    onSubmit() {
      this.$v.$touch()
      if (!this.$v.$invalid && this.$v.state.isAgree.$model) {
        if (this.pageType() === this.PAGE_TYPES.ADD) this.add()
        if (this.pageType() === this.PAGE_TYPES.EDIT) this.save()
      }
    },
    pageType() {
      if (!this.$route.params.id) return PAGE_TYPES.ADD
      switch (this.$route.query.type) {
        case 'edit':
          return PAGE_TYPES.EDIT
        case 'read':
          return PAGE_TYPES.READ
        default:
          return PAGE_TYPES.ADD
      }
    },
    async add() {
        await this.$store.dispatch('family/addFamily', this.familyInfo)
        .then((data) => {
          this.getSuccessAlert('Член семьи добавлен')
        })
        .catch(error => {
          console.log('error')
          console.log(error.status)
          switch (error.status) {
            case 500:
              this.getErrorAlert('Неверные данные')
              break
            case 410:
              this.getErrorAlert('Указанный член семьи добавлен ранее')
              break
            default:
              this.getErrorAlert('Ошибка добавления')
          }
        })
    },
    async remove() {
      await this.$store
        .dispatch('family/deleteFamily', this.familyInfo.id)
        .then(() => {
          this.getSuccessAlert('Член семьи удалён')
        })
        .catch(error => {
          console.log(error)
          this.getErrorAlert('Ошибка удаления')
        })
    },
    cancel() {
      this.$store.commit('family/reloadFamilyInfo')
      this.$router.push({ name: 'families' })
    },
    async save() {
      const familyInfo  = {...this.familyInfo,...{id:this.$route.params.id}}
      await this.$store.dispatch('family/addFamily',familyInfo)
        .then((data) => {
          this.getSuccessAlert('Член семьи добавлен')
          })
        .catch(error => {
          switch (error.status) {
            case 500:
              this.getErrorAlert('Неверные данные')
              break
            case 410:
              this.getErrorAlert('Указанный член семьи добавлен ранее')
              break
            default:
              this.getErrorAlert('Ошибка изменения')
          }
        })
    },

    /** Вспомогательные методы */

    getSuccessAlert(message) {
      this.$router.push({ name: 'families' })
      this.$store.dispatch('openGlobalAlert', {
        message,
        type: 'success'
      })
    },
    getErrorAlert(message) {
      this.state.infoModalMessage = message
      this.state.isActiveInfoModal = true
    },
    getStatusClasses(status) {
      switch (status) {
        case 1:
          return 'tw-text-green-700'
        case 2:
          return 'tw-text-purple-700'
        case 3:
          return 'tw-text-red-700'
        default:
          return ''
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import '~assets/less/_variables.less';
/deep/.wrapper .textarea {
  @apply tw-bg-white;
}

.alert-icon {
  @apply tw-text-red-600;
}

/deep/ .button {
  @apply tw-py-4;
  @apply tw-px-10;
}

/deep/.date-create-doc .pseudo-select-content {
  bottom: 60px;
}

@media (max-width: 769px) {
  /deep/ .h200 .flatpicker-overflow {
    @apply tw-h-auto;
  }
  /deep/ .wrapper .textarea {
    height: 120px;
    overflow: auto;
  }
}

@media (max-width: 1199px) {
  /deep/.date-create-doc .pseudo-select-content {
    left: auto;
    right: 0;
  }
}
</style>
