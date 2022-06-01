import { GetStaticProps } from 'next';
import Head from '../../node_modules/next/head';
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';

import styles from './home.module.scss'

interface HomeProps {
  product: {
    priceId: string,
    amount: number,
  }
}

export default function Home({product}: HomeProps) {
  return (
    <>
     <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero} >
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span></h1>
          <p>
            Get access to all the publications <br/>
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl Coding" />
      </main>
    </>
  )
}

// SSG
export const getStaticProps: GetStaticProps = async () => {
    const price = await stripe.prices.retrieve('price_1L5rJfCCaCFmjqSBPFmtTACF')
  
    const product = {
      priceId: price.id,
      amount: new Intl.NumberFormat("en-US",{
        style: 'currency',
        currency: 'USD',
      }).format(price.unit_amount / 100),
    }
  
    return {
      props: {
        product,
      },
      // revalidate => método especifico do SPG, é para marcar de quantos em quantos segundos o node vai fazer um GET no front
      revalidate: 60 * 60 * 24, // 24 hours
    }
  }

// SSR
// tudo que retorna de props aqui, vai pra dentro da função home
// todo código executado nesta função é feito pelo "node" do next
// export const getServerSideProps: GetServerSideProps = async () => {
//   const price = await stripe.prices.retrieve('price_1L5rJfCCaCFmjqSBPFmtTACF')

//   const product = {
//     priceId: price.id,
//     amount: new Intl.NumberFormat("en-US",{
//       style: 'currency',
//       currency: 'USD',
//     }).format(price.unit_amount / 100),
//   }

//   return {
//     props: {
//       product
//     }
//   }
// }
