'use client'
// import { useTranslations} from 'next-intl';
import { Button, Input, type FormProps } from 'antd';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HolderOutlined } from '@ant-design/icons';
import Layout from '@/components/Layout';
import Chart from '@/components/Chart';
import Sortable from 'sortablejs';


import boardList from './board';

import styles from './index.module.less';


export default function Dashboard() {
  // const t = useTranslations();
  const boardContainerRef = useRef<any>();
  const sortableRef = useRef<Sortable | null>(null);

  useEffect(() => {
    const initSortable = () => {
        const container = document.querySelector('#dashboard') as HTMLElement;
        if (!container) {
            requestAnimationFrame(initSortable);
            return;
        }
        sortableRef.current = new Sortable(container, {
            handle: ".moveBtn"
        });
    };

    initSortable();

    return () => {
        if (sortableRef.current) {
            sortableRef.current.destroy();
            sortableRef.current = null;
        }
    };
  }, [boardContainerRef])

  return (
    <Layout curActive='/dashboard'>
        <main className={styles.dashboardWrap}>
            <div className={styles.content} id='dashboard'>
                {
                    boardList.map((v, i) => {
                        return <div key={i} style={{width: v.w, height: v.h}} className={styles.card}> 
                            <span className='moveBtn'><HolderOutlined /></span>
                            <Chart data={v.data} type={v.type} id={v.id} />
                         </div>
                    })
                }
            </div>
        </main>
    </Layout>
    
  );
}
