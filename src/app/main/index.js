import {memo, useState} from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import TopHead from '../../containers/top-head';
import SelectCustom from '../../containers/select-custom';
import { useSsrEffect } from '@issr/core';

 function Main() {
  const store = useStore();

  // useSsrEffect(async() => {
  //   await Promise.all([
  //     store.actions.catalog.initParams(),
  //     store.actions.categories.load(),
  //   ]);
  // }, [])

  useInit(
    async () => {
      await Promise.all([
        store.actions.catalog.initParams(),
        store.actions.categories.load(),
      ]);
    },
    [],
    true,
  );

  const { t } = useTranslate();

  return (
    <PageLayout>
      <TopHead />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <CatalogFilter />
      <SelectCustom/>
      <CatalogList stateName={'catalog'}/>
    </PageLayout>
  );
}

export default memo(Main);
