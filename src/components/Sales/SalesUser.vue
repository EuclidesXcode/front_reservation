<template>
  <v-container fluid>
    <v-row justify="center">
      <v-subheader>Acompanhe em Tempo Real a venda de todas as lojas</v-subheader>

      <v-expansion-panels popout>
        <v-expansion-panel
          v-for="(message, i) in messages"
          :key="i"
          hide-actions
        >
          <v-expansion-panel-header>
            <v-row
              align="center"
              class="spacer"
              no-gutters
            >
              <v-col
                cols="4"
                sm="2"
                md="1"
              >
                <v-avatar
                  size="36px"
                >
                  <img
                    v-if="message.avatar"
                    alt="Avatar"
                    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgQDxUQEhASFRAVERAXEBEVCg8QFhAQFRIWGBsYFRUbHSggGBomGxUVITEhJSkrLjAuGB83ODMsNygtOisBCgoKDg0OGhAQGi8mICUvLS4tLS0tMC0tLy0tLS0tLy0tKy0tLS0tLS0tLS0tLS0tKy0tLS0tLS0tLS0tLS0tK//AABEIAOEA4QMBEQACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABQECAwQGBwj/xABMEAACAQIEAgUGCQUOBwAAAAAAAQIDEQQFEiEGMRMiQVFhBxRCcYGRMlJicqGxwdHSI3R1k7QVFzM0NVNUgoOStcLD4RYkJUSz8PH/xAAbAQEAAgMBAQAAAAAAAAAAAAAAAQUDBAYCB//EADcRAQACAQIDBAcHBAIDAAAAAAABAgMEEQUhMRIyQVETYXGBobHRFCIjUnKRwQYVM/Gy8CRC4f/aAAwDAQACEQMRAD8A9wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAA0sfmVOlsutPuvy9bKfiPGcWk+5H3r+Xl7Wzg01snPpCEr5ri5enZd0Vb6eZy2XjWsyz39vVHL/AO/FZ00eKvhv7Wt+6WMXKrL2yv8AWY6cS1demSfn82X7LinrWG3huIq0dqkVJd66svuf0Ftpv6gy15Zo3jzjlP0a+ThtZ7k7JqhmmDnDWpq3avST+bzOkw67Bmp26W+v7KrPivhna8bNTEZy/Qj7ZP7F94nVb92GlfPt0aFXOcb2SS/s4/ae65bS1ranJ5sX/EGOj8SXrhb6mjYrzYZ12Wvk2cNxZh72qwcPlJ617VzX0mb0Mz0TTi2OOWSNvX1T9CtSnFThJSi+Uk00zFMTE7StKZK3r2qzvC8h7AAAAAAAAAAAAAAAAAAAA1MyxfRU7r4T2j6+8rOLa77Jgm1e9PKPr7mxp8PpL7eDlqk29779p8+mZtO89V5Wu3JhlImIZIhilI9xDJENPFYqEdrq/dqRnpitbwTMxDR85qxlrUmpdj/97DaxTOOd68mvkx1yRMXjeE7l2ZQrKz2qLmu9d6L/AEmpjLG09XM67Q2wTvHOs+P1Z6hZ0VF4alU3MbTyQj8SiwxSrs8cl3D2dVcLV5t0ZP8AKR5/1ku9fSbWbBGWvr8GHhuvtpcnPuz1j+XpsZJq6d01dPvRTu6iYmN4VISAAAAAAAAAKAAAAAAAAAOf4iqvpFHsUfpbf3I4z+o8k21FaeER8/8AS24fT7kz62vl9bLVFqtFuV9n1rWt4P1mvw6+gjHNdTXnv159PczZ6Z5tE4p5Nyll+TVnanUkpW5KT+qSLXHw/hupnbDad/b9WvbUarFG945f98nlPE+ZY5V6tDU4Qp1JwtFtOSjJq7fPe17ctzFi0GPBaYnnMeMrfFaL0i/nDk57u5uwxzzndlwuNxNJ9STS+Lzi/YRfDTJH3oOabwnElNNSd4TW6aWpX+v2Gr9ivS3apKL1res1tHKXWYbi3K6lNS1vV6UVSqbS93IvtNhyZK77OR1XD8mO81jnHhKyXEeWt/CkvF0pfYWNNLkjwV+TRZfJklVpzjqjJSi+TTujYxxMTtKm1FLV3i0I2fMsqKSesvRuC8b0uEjFvrU24P5q3j9DS9hVa3H2Mu/nzdtwbP6XTRE9a8vonTUWwAAAAAAAAAAAAAAAAAAOc4lhapGXfG3tT/3Rx39RYts9b+cbft/tccNtvSY8pQcpFBELSIaOCzVwzTDU0+rranvzlVjKEU/en7ToeCU7F4yT48mHWY+1p7fv+zoM78neXYqvUryrVoyqNOUY9FZPSlteLfZf2nS30lL2m0yqcXEb48cUiI5I396bJ/6ViPfQ/AefsdPNP9xyflj4qPySZR/SsT76H4D19lp5p/uV/wAsfFY/JFk7/wC7xPvw/wCAmNNVH9xv+WPj9WTDeSfKabbWLxL2s03Q/AbGGPRTvDDl1dskbTWGzLyYZXzeIxHvo/gNuNVaPBqzO7zXAY7oajcW3Sb3T7Y32frSLGa9qOfVo63TRmpMePgnqnMyY3A3ja0p/gfMOjxPRt9Wqrf2kbuP+Ze1GLXYu1j7UeHyXXA9T6PP6Oelvn4PQyldiAAAAAAAAAKAAAAAAAAAOd4prR1Qh2pSb8L2t9TOV/qLLWbUxx1jeZ9644XSdrWc7ORzkQuIhxFTGyWI847Y1YzXqhJNfQkdNp6+jisR4bM1sfapNfONv3fQEZJpNcmk16mdO4mY2eQ5cl51j/0zl3+I1Cvxd+/tj5ry8fcx/ot/xdJmC/6hV/SWVfs5sT3p9sfJp1/xR+m3zc3w4l+42Z/ncv8ASPGP/Hb2tnUR+Pi9kfytrJef5t+c5X+20j1Het7kbfg4vZb5PT+JcT0WCr1O1Uamn5zi0vpaNukb2iFRDwKUS4pKLwnsBNypRfhb+7t9hlr1cDxPH2NVePf+7PCcoyUou0k04vuad0zZrETG0tSlpraLR1h65l+KjWowqr04RlbubW69jujm8tOxea+T6HgyxlxVyR4w2DGzAAAAAAAAFCQAAAAAABZWqxjFyfKKbfqSuY8t4x0m89Ijd6pWbWiseLg8XiJ1Jucucnd/cfO82W2bJOS3WXV4sUY6xWPBoY6o1Tm+6EvqZOGu94j1s9Y5uKaOjiG3EPdeFcT0uBw8+10aal86K0v6Uy+wW7WOs+pxOsx+jz3r65eb5ev+ax/6Zy7/ABCoaeLv39sfNbZI/Dx/ot/xdHmH8oVf0llf7OzZnvT7Y+TRp/ij9Nvm5zhz+Rsz/O5f6R4x9y3tbepj/wAjF+mP5WVv4/m35zlf7ZSPUd63uRt+Dh9lvlLtvKXiNGXuP85Upw9z1/5Dew95T0jm8enEsKSi8JbKv4JfOkbNZcRxyNtV7obDNqiph6TwTNvAwv2SqJerW39pScQj8efd8nb8GmZ0lff806aa0AAAAAAAABAAAAAAAA1sxhKVGpFc3CdvF2NbWUm+nvWOsxLNp7RXLWZ84efykfP4h10Q1MfvSn8yX1M29PXa8SyUjnDkmi8hubPVPJ5mVKGVylNvTQnW1tRcmoW6TZLd7SfuLbSXiMXPw3+rlOL4LTrIivW0Rt8mBcScCxc52tKdSFSo/M8ReVWE3OMn1eak2z1GXB1j5Jtw/iMxETHSNo5x06bdV0+NeCHN1HNubqU5uXmWJu6lOOmMvg80tj16bExRw7WxG23Lp1jx97Xo8V+T+FKpRjtSqy1VYLA4q05bbvq+C9wjJi22hNtFrptFp6x05x9Vs+LfJ/qqT5zqypyqvzHE3qzhNShfq81JJo9RfHMvM6PWxERPSPXHLzQnGfEjx04xjFxowu4p21Sk/SlbZbbJeL79tzHyakY+zDlpo26yx2hK5fC1KPi5P6f9jaxy4Tjc76qfVEQzWNuiriN+UPVcgwToYanSfwlG8vCcm5Ne929hQanJ6TLNod/ocHoNPWk9fH2ykDA2wAAAAAAACgAAAAAAAADiuIsslRm5xX5KT2+RJ+i/sOS4joJwZJvWPuz8J8vo6Xh2rjNTsW70fH1oOpZq3eadK7LSHJ1INNp802vcW9ecbrCOfN1PBHEOAwsK9HEKTpVVG2mDlvaUZJpb7px9zN7TZa0iYt4qjinD8uotS+HrHu9cJ6OF4PdB4lYCs6Cvep0Fe1ls3bVdx8bWNmK4ez2oryVk5OIRl9DOWO15bx/3f1IueM8my381n+qxD/zEb4PJnnScVj/2+MMDzLyY/wBGn+pxH4iYth8mL0HE/wA3xhL4fLOCXRWLWXVVR2cajo10rX2kk5Xt42sZqVpPOIaOXNqq2nHa/Py3hB8UVuHpRh5pTlGd3rb1pONuVpN73NmkteIvHec1KLNmksd+UbynXRcYxgt2klsub/8Apt4pfO9dacuabR4y67hbhmcZKvXjZrenTfNPslLufcjBqdXvHYp75XPCuEzSYzZo5+EfzLsCudIAAAAAAAAAKAAAAAAAAALatOEouMknFqzTV00RatbRNbRyl6raazFqztLlM14VqK8qDuv5uUrNfNl2+33spc/Ctp3xftP1X2l4vXu5o98fzDgs+wFelUvOEo35qUWt/DvMFKWp920bOk0uamWv3JiUTIzQ3Ih6dDjfJoZcor+GVBU1h+il8NQ02va2jx7vHYs4z07H8OQng2qtq5me7vv2vVv8/U8rtZWNSHZbbt7CcOzrbzThDvtaUvUvtZs49NNuc8oV2qz4q8q85et5nnmBlgpU6fw5UnCNPQ0oXjp3drWRu9iXG10Ob0nP93nLyvE/J/vE1rMNqdLeUxw1wnOtU1znaEPixvefYk37/cZJv2Vfr9Ntj7E25z5eTvcBlGCobwh1/jy60vf2eyx4tktblMqvBosOGd6xz8/FvGNtAAAAAAAAAAAAAAAAAAAAAAGLE0KNWDhOKlBreLV0xMb9XvHktjtFqTtLiM44NoQblCnqh8lyUo+tLn60eJ0+KfB0ml4za0bWttPr6INZHgPiy/WyIjS4/JZfbc3n8G1h8Bhae8acU++1373uZa46V6Qw3zZL96WxYyMWxYGzcy3LK9eVoq0V8KbWy+9+BEy1tRqaYY59fJ2mEw9KlBQirRXvb734niebnsmS2S02szEMYAAAAAAAAAAAKAAAAAAAAAAAAAA1MVluDq7ypq/xl1X71zJ3Z8epy4+7ZHVOGsM/gzmvXpl9xO7crxTJHWIljXDEP55/qV947T3/AHWfy/FtYfh7Ax3lqm/lSsvciN5YMnEc1uUckrCMYqySSXJJWS9SIaMzMzvKoQAAAAAAAAAAAABQkAAAAAAAAITOOK8lwlVUa9VxqOMZJeb1prTJtJ6oxa5xZMRMomYhgw/HHDs63QRxC1OWmMnTnGEpXtZVGrep8n2DsydqFkePOGnV6LzhXvbX0VRU7/Pta3yuXiOzJ2oS2cZzl2Egp16sYRd9N1KTk1z0xim3zXJERG5M7IzLON+H8RUVKFe05O0FOjUpqb7lJq1/DmyZrJ2obGd8VZNgqip4iq4TcFNJYetUvFtq94xa5xewiJkmdkRxbxLhZ4PFwwteXT0FQ1zpucdDlXjG0Zrm9pJ2ZMRzRMtLgDiHRl1bE4zETcYYlx11J1KsknTp2jFbt7t7LxFo58is8nVZTxDleKpzrUqjdKn/AAlSdGpSjGyu+tNJOy3fddETGyYndF/vg8M69HnD521+bVtF/Xp5ePInsyjtQt484k80wilRqpV6ul4eSpKrGcFKDm02nG2iXb37EVjeS0sHk/4sWLp9DWq6sZ+Uk15u4LoU4pO8YqHpesm0bFZ3dieXoAAAAAAAAAAAAAAAAAAHjvlYV8yiu/DUf/JUMlejHbqt8p2RZdgqlFYenoU6dTUuknK7g4pPrN79bcVnctGy/j/h/LcLh8JOjBxlOLVR9JKWtqEHd3ezu3ytzFZLRskOJeIcNDL8Dh54eGIrSwuGrflXPTD8npTai05t9fa6W29yIjmmZ5OX4wy/H0JwdbC0MNOUJOKoO0ZaWt3HXLTJX7LXPVZeZSvlVqSeJoSe7eBot+Lc6jIomzpeIuGsuwOT11Si+klDDKrUc5N1Gq8Oy9krt7JHmJmZTMbQ8v6bEOiqb1dAqrlZK0ellFLny1aYbX8e9mR5ekcbVMNHI6CwathZ1KKdufR6Zy6/yukjG/yjxHXm9T05OYwmT42tgE4YTB9G3/G5Y2EKqlq5ScqiS+Lpa9l9yd+aNuSazjJMVRyJrF00q+HrWw76ZT0UqtWlf4Ltu3JWfKyIiefJMxySnknwWWdB06UfO9VaEn0z1dFeDtova3wd7EXTV6AeXoAAAAAAAAAUAAAAAAAAEDl+JOCcHjsQsROtVhJQhDTFQtaMpO+6v6R6i0w8zXdm4t4RwuYypyqVakOjjNLQoO+tp73XyRFtkzG67iThTDY6lSpTqVIKjfS4qF5XjFb3XyRE7Exu1c44Fy7E0KFKU6kZ0KUKUKyUW5U4pK048n39nN94i0wiao6v5MsHUS6TF4qc0rOcpQl1exJSTslvtftJ7Z2UhxHwNgsdOE51qsXCjCklFU94xcnd3XPrERaYJrum89yqli8NPDTlKMZ6Lyja60zjLa+3okROyZjdC4fgTL4YKpgnOpKE6qqqo1DXTqKMUnGytyjb+sye1O+6OzybGT8I4PD4aphJTnWw9R3dOoo9R9ri4pNbqL8GroTO5EIGXkpyxzv5xW0fF0UnK3drt9hPblHYdfXyTBzwnmclOVHo1Deo5TtG1nqfpJpNepHned93rbwQnDPAuEwOI84jXqzlplGMXGEVplz1W+FyXcTNt0RXZ1hD0AAAAAAAAABAAAAAAAAAYMZSqTjaMkpKdOSbTa6s1Kzs1ztb2kjUq5bVlOcul06oyWqMZKUdVNQtfV8FNOaSS39t26NmN5VWcYrpIqzqWtRcVT1Si06aTVpRs0m7/CfjdubNnE4Kc60aikko6PRepaZ6mou+ykuq9nsNxqUsnqxhGPSR1RqqeroVvZW3Xa/F3e/MbmzNHLqqqRn0m0ZSdnT1WTqVJWi2+rdTSb59SPqG5suyrLp0YOE6jqR004rUm9ows0227ptv2WW9hubMVDKXCVFqUbU6emS6JdaXbJX5P1Dc2YKOQTUFCWIqSVqKu0pNKnCpGy1XXpxd2m7xve9rNzZtV8vrzhUp9LaM5RalabkodXVG+pc0rXVubG4trZVOSk3OPSTo0YSn0SV5Qk3KVvldVW+SuY3Nm/hqThCMdtopbRSWy7lyCWUgAAAAAAAAAFCQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgCQAAAAAAAApdAUc0Ba6sQLXXiBTziI2DziIFVXiBcqsQKqaAuugKgAAAAAAAAAACgQAAAAAAAAUkwMUmwMM5SA16kpEjXnOoBrzqVwEatfuAzQnUA2acpgbEJSIGaLYGWLAuAAAAAAAAAAAAAAAAAAAABa4oC100BY6CAteGQFvmkQHmkQKrCoC9UEBeqSAuUUBcAAAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/2Q=="
                  >
                  <v-icon
                    v-else
                    :color="message.color"
                    v-text="message.icon"
                  ></v-icon>
                </v-avatar>
              </v-col>

              <v-col
                class="hidden-xs-only"
                sm="5"
                md="3"
              >
                <strong v-html="message.name"></strong>
              </v-col>

              <v-col
                class="text-no-wrap"
                cols="5"
                sm="3"
              >
                <v-chip
                  v-if="message.new"
                  :color="`${message.color} lighten-4`"
                  class="ml-0 mr-2 black--text"
                  label
                  small
                >
                  {{ message.new }} new
                </v-chip>
                <strong v-html="message.title"></strong>
              </v-col>

              <v-col
                v-if="message.excerpt"
                class="grey--text text-truncate hidden-sm-and-down"
              >
                {{ message.excerpt }}
              </v-col>
            </v-row>
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <v-divider></v-divider>
            <ListSales />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>

<script>
import ListSales from './ListSales'

  export default {
    components: {
      ListSales: ListSales
    },
    data: () => ({
      messages: [
        {
          avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
          name: 'Bom Preço Vila Operária',
          new: 15,
          excerpt: 'Ultima venda R$ 430,39',
        },
        {

          avatar: 'https://projetandopessoas.com.br/wp-content/uploads/2013/01/Paula-avatar1.jpg',
          color: 'red',
          name: 'Bom Preço Jardim Leal',
          new: 33,
          excerpt: 'Ultima venda R$ 120,39',
        },
        {
          avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSW61AbkdcoMolKxUV2QlRJ1Fh5bSJWAz1PTvf73GOrYmgcR0q4&usqp=CAU',
          color: 'teal',
          name: 'Bom Preço Beira Mar',
          new: 348,
          excerpt: 'Ultima venda R$ 320,39',
        },
      ],
      lorem: 'Lorem ipsum dolor sit amet, at aliquam vivendum vel, everti delicatissimi cu eos. Dico iuvaret debitis mel an, et cum zril menandri. Eum in consul legimus accusam. Ea dico abhorreant duo, quo illum minimum incorrupte no, nostro voluptaria sea eu. Suas eligendi ius at, at nemore equidem est. Sed in error hendrerit, in consul constituam cum.',
    }),
  }
</script>
