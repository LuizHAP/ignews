import { GetStaticProps } from 'next'
import Head from "next/head";
import Image from 'next/image'
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from '../services/stripe';

import styles from './home.module.scss';

interface HomeProps {
  product: {
    priceId: string;
    amount: number
  }
}

const REVALIDATE_TIME = 60 * 60 * 24

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>
            👏 Hey, welcome!
          </span>
          <h1>News about <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <Image src="/images/avatar.svg" alt="Girl coding" height={500} width={500} />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1LEaUjA5E6e3HQoUYwWlS0c4')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-Us', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  }


  return {
    props: {
      product
    },
    revalidate: REVALIDATE_TIME
  }
}