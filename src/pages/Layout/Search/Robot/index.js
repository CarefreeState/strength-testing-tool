import CollapseItems from '@/components/Collapse/CollapseItems'
import EchartsSlitter from '@/components/Slitter/EchartsSlitter'
import QueryHorizontalBar from '@/components/Echarts/QueryHorizontalBar'
import DetailHorizontalBar from '@/components/Echarts/DetailHorizontalBar'
import QueryPagination from '@/components/Pagination/QueryPagination'
import LoadingAnimation from '@/components/Loading/LoadingAnimation'
import SwitchButton from '@/components/Button/SwitchButton'
import { useState } from 'react';
import SimpleCheckbox from '@/components/Button/SimpleCheckbox'
import LimitSelector from '@/components/Selector/LimitSelector'
import NumberSelector from '@/components/Selector/NumberSelector'
import PrettyButton from '@/components/Button/PrettyButton'
import DateTimeSelector from '@/components/Selector/DateTimeSelector'

const Robot = () => {
  const [loading, setLoading] = useState(false);
  const [prettyButtons, setPrettyButtons] =useState([
    {
      label: '胜率',
      sort: 'asc',
      active: true
    },
    {
      label: '平均总治疗',
      sort: 'desc',
      active: false
    },
    {
      label: '平均总输出',
      sort: 'desc',
      active: false
    },
    {
      label: '平均战斗时长',
      sort: 'desc',
      active: false
    },
  ])
  // item: {label, descriptions:[name, content]}
  
  const items = [
    {
      active: true,
      vertical: true,
      label: '查询条件',
      cardinality: 1,
      descriptions: [
        {name: '是否启动', content: <SwitchButton/>},
        {name: '时间范围', content: <DateTimeSelector/>},
        {name: '队长', content: <LimitSelector maxCount={1} options={[
          { value: '10700', label: '吟游诗人队长' },
          { value: '11300', label: '矮人坦克队长' },
          { value: '11400', label: '人类牧师队长' },
          { value: '11500', label: '巨剑战士队长' },
          { value: '11600', label: '利爪刺客队长' },
          { value: '11700', label: '精灵弓箭手队长' },
          { value: '11900', label: '雷电法师队长' },
          { value: '12000', label: '亡灵术士队长' },
          { value: '12100', label: '熊人坦克队长' },
          { value: '12200', label: '提夫林火法队长' }
        ]}/>},
        {name: '小兵数量', content: <NumberSelector max={5} min={0}/>},
        {name: '小兵', content: <LimitSelector maxCount={5} options={[
          { value: '22300', label: '犀士多' },
          { value: '22600', label: '烈焰萨满' },
          { value: '22800', label: '骨蕾娅' },
          { value: '22900', label: '锤皮巴拉' },
          { value: '23000', label: '塔顿·地斧' },
          { value: '23200', label: '沫沫' },
          { value: '23300', label: '辉叶莉兹' },
          { value: '23400', label: '喵瑟夫' },
          { value: '23500', label: '利爪哈迪' },
          { value: '23600', label: '传令官' },
          { value: '23700', label: '樵夫查狸' },
          { value: '23800', label: '针太郎' },
          { value: '23900', label: '毒刺' },
          { value: '24000', label: '宝藏猎人' },
          { value: '24100', label: '爆裂卡莉' },
          { value: '24200', label: '火枪司令' },
          { value: '24300', label: '花藤小姐' },
          { value: '24500', label: '雷霆娜娜' }
        ]}/>},
        {name: '进修', content: <LimitSelector options={[
          { value: '100003', label: '彩-获得金币时获得宝石' },
          { value: '100004', label: '彩色-金币增伤' },
          { value: '100008', label: '金色-精益求精' },
          { value: '100011', label: '野怪打手' },
          { value: '100012', label: '天眼' },
          { value: '100013', label: '复制体' },
          { value: '100014', label: '终身会员' },
          { value: '100015', label: '彗星子弹' },
          { value: '100017', label: '紧急保护' },
          { value: '100018', label: '强力弩箭' },
          { value: '100019', label: '金色-战力-多职业强化' },
          { value: '100020', label: '变形重组' },
          { value: '100021', label: '黑暗契约' },
          { value: '100022', label: '战功卓著' },
          { value: '100023', label: '幸运儿' },
          { value: '100024', label: '孤注一掷' },
          { value: '100025', label: '幸存者' },
          { value: '100026', label: '庞然大物' },
          { value: '100027', label: '赏金猎人' },
          { value: '100028', label: '妙手空空' },
          { value: '100029', label: '饱和治疗' },
          { value: '100030', label: '廉价施法' },
          { value: '100031', label: '意外收获' },
          { value: '100032', label: '天赐之物' }
        ]}/>},
        {name: '遗物', content: <LimitSelector options={[
          { value: '100002', label: '银色-经济-击杀精英额外金币' },
          { value: '100003', label: '金色-守护复苏' },
          { value: '100004', label: '金色-射手连击' },
          { value: '100005', label: '金色-战士强攻' },
          { value: '100006', label: '金色-辅助减疗' },
          { value: '100007', label: '金色-法师冷却' },
          { value: '100008', label: '金色-战力-增加战士攻击' },
          { value: '100009', label: '金色-战力-增加射手攻速' },
          { value: '100010', label: '金色-战力-增加守护血量' },
          { value: '100011', label: '金色-免费宝箱' },
          { value: '100012', label: '彩色-经济-开箱加速及额外宝石' },
          { value: '100013', label: '银色-战力-击杀回耐' },
          { value: '100014', label: '金色-经济-开箱额外宝石' },
          { value: '100015', label: '金色-战力-全部-加速' },
          { value: '100016', label: '金色-经济-宝箱价格降低' },
          { value: '100017', label: '彩色-战力-生命强化主近战' },
          { value: '100018', label: '彩色-战力-攻速强化主远程' },
          { value: '100019', label: '金色-超级有力' },
          { value: '100020', label: '求生意志' },
          { value: '100021', label: '魔力汲取' },
          { value: '100022', label: '力量代价' },
          { value: '100023', label: '悬赏令' },
          { value: '100024', label: '召唤宝石' },
          { value: '100025', label: '金色-战力-增加法师伤害' }
        ]}/>},
        {name: '装备', content: <LimitSelector options={[
          { value: '101001', label: '数值强化-银-生命增加' },
          { value: '101002', label: '数值强化-银-攻击增加' },
          { value: '101003', label: '数值强化-银-攻速增加' },
          { value: '101004', label: '数值强化-银-减伤增加' },
          { value: '101005', label: '数值强化-银-护盾效果增加' },
          { value: '101006', label: '数值强化-银-治疗效果增加' },
          { value: '102001', label: '数值强化-金-生命增加' },
          { value: '102002', label: '数值强化-金-攻击增加' },
          { value: '102003', label: '数值强化-金-攻速增加' },
          { value: '102004', label: '数值强化-金-减伤增加' },
          { value: '102005', label: '数值强化-金-护盾效果增加' },
          { value: '102006', label: '数值强化-金-治疗效果增加' },
          { value: '102007', label: '荣誉勋章' },
          { value: '103001', label: '数值强化-彩-生命增加' },
          { value: '103002', label: '数值强化-彩-攻击增加' },
          { value: '103003', label: '数值强化-彩-攻速增加' },
          { value: '103004', label: '数值强化-彩-减伤增加' },
          { value: '103005', label: '数值强化-彩-护盾效果增加' },
          { value: '103006', label: '数值强化-彩-治疗效果增加' },
          { value: '103007', label: '彩-闪电链' },
          { value: '103008', label: '彩-点燃' },
          { value: '103009', label: '彩-反击风暴' },
          { value: '103010', label: '银色-额外子弹' },
          { value: '103011', label: '银色-战力-小兵-半血回复' }
        ]}/>},
        {name: '专属强化', content: <LimitSelector options={[
          { value: '10027', label: '金色-吟游诗人队长专属强化' },
          { value: '10033', label: '金色-矮人坦克队长专属强化' },
          { value: '10034', label: '金色-雷电法师队长专属强化' },
          { value: '10035', label: '金色-利爪刺客队长专属强化' },
          { value: '10036', label: '金色-精灵弓箭手队长专属强化' },
          { value: '10037', label: '金色-人类牧师队长专属强化' },
          { value: '10038', label: '金色-巨剑战士队长专属强化' },
          { value: '10039', label: '金色-亡灵术士队长专属强化' },
          { value: '10040', label: '金色-提夫林火法队长专属强化' },
          { value: '10041', label: '金色-熊人坦克队长专属强化' }
        ]}/>},
      ]
    },
    {
      active: true,
      vertical: true,
      label: '模糊条件',
      cardinality: 4.5,
      descriptions: [
        {name: '是否启动', content: <SwitchButton/>},
        {name: '选项', content: <>
          <SimpleCheckbox>队长</SimpleCheckbox>
          <SimpleCheckbox>小兵</SimpleCheckbox>
          <SimpleCheckbox>进修</SimpleCheckbox>
          <SimpleCheckbox>遗物</SimpleCheckbox>
          <SimpleCheckbox>装备</SimpleCheckbox>
          <SimpleCheckbox>专属强化</SimpleCheckbox>
        </>},
      ]
    },
    {
      active: true,
      vertical: false,
      label: '输出条件',
      cardinality: 2.2,
      descriptions: prettyButtons.map((item, index) => {
        return {
          content: <PrettyButton
            sort={item.sort}
            active={item.active}
            onClick={() => {
              setPrettyButtons(prettyButtons.map((button, i) => {
                if(i === index) 
                  if(button.active === true) {
                    button.sort = button.sort === 'desc' ? 'asc' : 'desc';
                  }else {
                    button.active = true;
                  }
                else 
                  button.active = false;
                return button;
              }))
            }}
          >{item.label}</PrettyButton>
        }  
      })
    }
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {loading && <LoadingAnimation/>}
      <div style={{ flex: 1, minHeight: 0 }}>
        <EchartsSlitter 
          top={<CollapseItems style={{ flex: 1, minWidth: '1750px'}} items={items}/>} 
          left={<QueryHorizontalBar setLoading={setLoading} />} 
          right={
            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              padding: '20px',
              boxSizing: 'border-box',
              gap: '20px'
            }}>
              <DetailHorizontalBar/>
              <DetailHorizontalBar/>
              {/* <DetailHorizontalBar/> */}
              <DetailHorizontalBar/>
            </div>
          }
          pagination={<QueryPagination />}
        />
      </div>
    </div>
  )
}

export default Robot