import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import PageHeader from '../components/page-header/page-header'

export default function Home() {
  return (
    <>
        <SafeAreaView>
            <PageHeader/>
        </SafeAreaView>
    </>
  )
}
