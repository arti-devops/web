<script setup>
import aeIcon from '@images/icons/payments/ae-icon.png'
import mastercardIcon from '@images/icons/payments/mastercard-icon.png'
import visaIcon from '@images/icons/payments/visa-icon.png'

const lastTransitions = [
  {
    fullName: 'Dro Chris',
    lastDigit: '*4230',
    cardType: 'Credit',
    sentDate: '17 Mar 2022',
    status: 'Verified',
    trend: '+$1,678',
  },
  {
    fullName: 'Dro Chris',
    lastDigit: '*5578',
    cardType: 'Credit',
    sentDate: '12 Feb 2022',
    status: 'Rejected',
    trend: '-$839',
  },
  {
    fullName: 'Dro Chris',
    lastDigit: '*4567',
    cardType: 'Credit',
    sentDate: '28 Feb 2022',
    status: 'Verified',
    trend: '+$435',
  },
  {
    fullName: 'Dro Chris',
    lastDigit: '*5699',
    cardType: 'Credit',
    sentDate: '8 Jan 2022',
    status: 'Pending',
    trend: '+$2,345',
  },
  {
    fullName: 'Dro Chris',
    lastDigit: '*5699',
    cardType: 'Credit',
    sentDate: '8 Jan 2022',
    status: 'Rejected',
    trend: '-$234',
  },
]

const resolveStatus = {
  Verified: 'success',
  Rejected: 'error',
  Pending: 'secondary',
}
</script>

<template>
  <VCard title="Informations sous tâches">
    <VDivider />
    <VTable class="text-no-wrap">
      <thead>
        <tr>
          <th scope="col">
            NOM ET PRENOMS
          </th>
          <th scope="col">
            DIRECTION
          </th>
          <th scope="col">
            FONCTION
          </th>
          <th scope="col">
            TÂCHES
          </th>
          <th scope="col">
            PROGRESSION
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="transition in lastTransitions"
          :key="transition.lastDigit"
        >
          <td style="padding-block: 0.61rem;">
            {{ transition.fullName }}
          </td>
          <td style="padding-block: 0.61rem;">
            <span class="text-sm opacity-100 text-disabled">DSESP</span>
          </td>
          <td style="padding-block: 0.61rem;">
            <span class="font-weight-medium text-medium-emphasis text-base">{{ transition.trend }}</span>
          </td>
          <td style="padding-block: 0.61rem;">
            <span class="font-weight-medium text-medium-emphasis text-base">{{ transition.sentDate }}</span>
          </td>
          <td style="padding-block: 0.61rem;">
            <VChip
              label
              :color="resolveStatus[transition.status]"
            >
              {{ transition.status }}
            </VChip>
          </td>
        </tr>
      </tbody>
    </VTable>
  </VCard>
</template>
