// 「平然化世界」MVU 变量结构定义（Zod 4）—— v3 状态栏驱动结构（v2.1 版式约定＋配角状态/随机NPC 扩展）
// 运行时已注入全局 z（Zod 4）与 _（lodash），此处禁止任何 import。
// 说明：prefault 为字段缺失时的兜底值，正式开局初值以 initvar.yaml 为准；
//       标注 [G7 待确认] 的取值需在 G7 门由用户最终确认。

export const Schema = z
  .object({
    世界: z
      .object({
        日期: z
          .string()
          .describe('游戏内当日日期，格式 YYYY-MM-DD（例：2024-04-01）')
          .prefault('2024-04-01'), // [G7 待确认] 开局日期
        时间段: z
          .enum(['清晨', '上午', '午后', '傍晚', '夜晚', '深夜'])
          .describe('当日所处时段，按 清晨→上午→午后→傍晚→夜晚→深夜 推进')
          .prefault('清晨'),
        当前位置: z
          .string()
          .describe('当前所在区域或场景名，自由文本，与地理类世界书条目对应')
          .prefault('汐见大学·女生宿舍向阳庄'), // [G7 待确认] 开局位置
        季节活动: z
          .enum(['平常', '入学式', '梅雨', '花火大会', '学园祭', '灯饰', '考试季', '毕业式'])
          .describe('当前年历活动期：「平常」为常态，其余对应年历七锚点')
          .prefault('入学式'), // [G7 待确认] 开局活动期
      })
      .prefault({}),
    凉花: z
      .object({
        好感度: z
          .coerce.number()
          .describe('凉花对主角的好感度，范围 0~100，越界自动截断到边界')
          .transform((value) => _.clamp(value, 0, 100))
          .prefault(0), // [G7 待确认] 开局好感度
        欲情: z
          .coerce.number()
          .describe('凉花对主角的欲情度，范围 0~100，越界自动截断到边界')
          .transform((value) => _.clamp(value, 0, 100))
          .prefault(0),
        关系阶段: z
          .enum(['初识', '熟识', '亲密', '恋人'])
          .describe('凉花与主角的关系阶段，全正向单向推进，无负面阶段')
          .prefault('初识'),
        当前穿着: z
          .string()
          .describe('凉花当前身上穿/不穿的直白描述，如「大一号针织开衫」「全裸」')
          .prefault('全裸'), // [G7 待确认] 本世界全裸为自然常态
        配饰: z
          .string()
          .describe('凉花当前佩戴的配饰清单，未佩戴写「无」，如「狐尾尾饰+细银脚链」')
          .prefault('无'),
        内心活动: z
          .string()
          .describe('凉花此刻的一两句心里话，随回合更新')
          .prefault('平静如常'),
        身体状态: z
          .object({
            嘴唇: z.string().describe('单句动态陈述，如「嘴唇微张，呼出细软的气音」；角色提示：轻语软糯，句尾带气音').prefault('无异状'),
            耳朵: z.string().describe('单句动态陈述，如「被夸到耳根通红，烫得发晕」；角色提示：耳根易红，被夸奖冒蒸汽').prefault('无异状'),
            脖颈: z.string().describe('单句动态陈述，位置感优先，如「项圈贴着喉间，随吞咽轻动」；角色提示：怕痒，颈侧被碰会缩肩').prefault('无异状'),
            后背: z.string().describe('单句动态陈述，位置感优先，如「后背贴着椅背，汗顺着肩胛滑下」；角色提示：怕痒').prefault('无异状'),
            双手: z.string().describe('单句动态陈述，写明搭在哪，如「指尖攥着开衫衣角，绞成一小团」').prefault('无异状'),
            胸部: z.string().describe('单句动态陈述，如「被指腹擦过，下意识朝人凑近了些」').prefault('无异状'),
            双腿: z.string().describe('单句动态陈述，写明并拢/搭向哪，如「双腿悄悄并拢夹紧」').prefault('无异状'),
            小穴: z.string().describe('单句动态陈述，如「开始有些湿润了」').prefault('无异状'),
            后庭: z.string().describe('单句动态陈述，位置感优先，如「狐尾顺着腿弯垂下来，尾巴尖搭在小腿上」').prefault('无异状'),
            双脚: z.string().describe('单句动态陈述，如「脚趾蜷起来，细脚链轻轻磕在一起」；角色提示：怕痒，脚踝常戴细脚链').prefault('无异状'),
          })
          .describe('十键按头到脚固定顺序渲染融合：嘴唇→耳朵→脖颈→后背→双手→胸部→双腿→小穴→后庭→双脚。每键＝单句平实的动态状态陈述，只写此刻怎么了；静态形状/颜色/触感不进状态栏，由 NSFW 调色盘条目承载；各行句式互不重复，不堆叠「有些/已经/还在」等空泛副词；位置感优先（贴着哪、垂向哪、搭在哪）')
          .prefault({}),
      })
      .prefault({}),
    凛音: z
      .object({
        好感度: z
          .coerce.number()
          .describe('凛音对主角的好感度，范围 0~100，越界自动截断到边界')
          .transform((value) => _.clamp(value, 0, 100))
          .prefault(0), // [G7 待确认] 开局好感度
        欲情: z
          .coerce.number()
          .describe('凛音对主角的欲情度，范围 0~100，越界自动截断到边界')
          .transform((value) => _.clamp(value, 0, 100))
          .prefault(0),
        关系阶段: z
          .enum(['初识', '熟识', '亲密', '恋人'])
          .describe('凛音与主角的关系阶段，全正向单向推进，无负面阶段')
          .prefault('初识'),
        当前穿着: z
          .string()
          .describe('凛音当前身上穿/不穿的直白描述，如「学生会制服外套披在肩上」「全裸」')
          .prefault('全裸'), // [G7 待确认] 本世界全裸为自然常态
        配饰: z
          .string()
          .describe('凛音当前佩戴的配饰清单，未佩戴写「无」，如「圣诞树形尾饰+珍珠项链」')
          .prefault('无'),
        内心活动: z
          .string()
          .describe('凛音此刻的一两句心里话，随回合更新')
          .prefault('平静如常'),
        身体状态: z
          .object({
            嘴唇: z.string().describe('单句动态陈述，如「舔掉唇角的蛋糕碎屑，抿了抿」；角色提示：嗜甜').prefault('无异状'),
            耳朵: z.string().describe('单句动态陈述，如「被指尖擦过耳后，红着耳根一板一眼地别开脸」；角色提示：耳后弱点').prefault('无异状'),
            脖颈: z.string().describe('单句动态陈述，位置感优先，如「黑长发丝滑过锁骨，垂在胸前」；角色提示：黑长直').prefault('无异状'),
            后背: z.string().describe('单句动态陈述，如「脊背绷得笔直，肩胛轻轻收拢」').prefault('无异状'),
            双手: z.string().describe('单句动态陈述，写明搭在哪，如「手指捏着学生会的钢笔，指节泛白」').prefault('无异状'),
            胸部: z.string().describe('单句动态陈述，如「呼吸起伏比平时明显，衣料随之轻动」').prefault('无异状'),
            双腿: z.string().describe('单句动态陈述，写明并拢/搭向哪，如「膝盖悄悄向中间靠拢」').prefault('无异状'),
            小穴: z.string().describe('单句动态陈述，如「一阵收紧，渗出温热」').prefault('无异状'),
            后庭: z.string().describe('单句动态陈述，位置感优先，如「尾饰底座安稳贴合，流苏垂向腿弯」').prefault('无异状'),
            双脚: z.string().describe('单句动态陈述，如「脚链坠子贴着踝骨，一走一晃」').prefault('无异状'),
          })
          .describe('十键按头到脚固定顺序渲染融合：嘴唇→耳朵→脖颈→后背→双手→胸部→双腿→小穴→后庭→双脚。每键＝单句平实的动态状态陈述，只写此刻怎么了；静态形状/颜色/触感不进状态栏，由 NSFW 调色盘条目承载；各行句式互不重复，不堆叠「有些/已经/还在」等空泛副词；位置感优先（贴着哪、垂向哪、搭在哪）')
          .prefault({}),
      })
      .prefault({}),
    千夏: z
      .object({
        好感度: z
          .coerce.number()
          .describe('千夏对主角的好感度，范围 0~100，越界自动截断到边界')
          .transform((value) => _.clamp(value, 0, 100))
          .prefault(0), // [G7 待确认] 开局好感度
        欲情: z
          .coerce.number()
          .describe('千夏对主角的欲情度，范围 0~100，越界自动截断到边界')
          .transform((value) => _.clamp(value, 0, 100))
          .prefault(0),
        关系阶段: z
          .enum(['初识', '熟识', '亲密', '恋人'])
          .describe('千夏与主角的关系阶段，全正向单向推进，无负面阶段')
          .prefault('初识'),
        当前穿着: z
          .string()
          .describe('千夏当前身上穿/不穿的直白描述，如「芭蕾练功服」「全裸」（练功服是她最庄重的职业装，课下即回裸体）')
          .prefault('全裸'), // [G7 待确认] 本世界全裸为自然常态
        配饰: z
          .string()
          .describe('千夏当前佩戴的配饰清单，未佩戴写「无」，如「心形切面尾饰+刻名脚链」')
          .prefault('无'),
        内心活动: z
          .string()
          .describe('千夏此刻的一两句心里话，随回合更新')
          .prefault('平静如常'),
        身体状态: z
          .object({
            嘴唇: z.string().describe('单句动态陈述，如「凑到耳边，唇瓣开合把声音压得又低又慢」；角色提示：贴耳低语的语言刺激担当').prefault('无异状'),
            耳朵: z.string().describe('单句动态陈述，如「耳畔刚送完一句低语，温热的气息扫过」').prefault('无异状'),
            脖颈: z.string().describe('单句动态陈述，位置感优先，如「下颌微抬，颈线拉出芭蕾的弧度」；角色提示：芭蕾体态').prefault('无异状'),
            后背: z.string().describe('单句动态陈述，如「背肌舒展又收紧，肩胛划出流畅的线条」；角色提示：十几年芭蕾训练').prefault('无异状'),
            双手: z.string().describe('单句动态陈述，写明搭在哪，如「指尖搭在对方手背上，轻轻点了点」；角色提示：指导与爱抚并用').prefault('无异状'),
            胸部: z.string().describe('单句动态陈述，如「随深呼吸缓缓起伏，微微挺起了一些」').prefault('无异状'),
            双腿: z.string().describe('单句动态陈述，写明并拢/搭向哪，如「长腿交叠，脚背绷出弧线」').prefault('无异状'),
            小穴: z.string().describe('单句动态陈述，如「微微张着，内里泛着湿润的水光」').prefault('无异状'),
            后庭: z.string().describe('单句动态陈述，位置感优先，如「宝石底座贴合，水晶拉环垂在身后」').prefault('无异状'),
            双脚: z.string().describe('单句动态陈述，如「落地时足弓轻颤了一下，刻名脚链贴着踝骨」；角色提示：足尖功旧伤').prefault('无异状'),
          })
          .describe('十键按头到脚固定顺序渲染融合：嘴唇→耳朵→脖颈→后背→双手→胸部→双腿→小穴→后庭→双脚。每键＝单句平实的动态状态陈述，只写此刻怎么了；静态形状/颜色/触感不进状态栏，由 NSFW 调色盘条目承载；各行句式互不重复，不堆叠「有些/已经/还在」等空泛副词；位置感优先（贴着哪、垂向哪、搭在哪）')
          .prefault({}),
      })
      .prefault({}),
    主角: z
      .object({
        近期事件标记: z
          .array(z.string())
          .describe('主角近期经历的剧情事件标记列表，随剧情动态增删，用于事件去重与后续触发判定')
          .prefault([]),
      })
      .prefault({}),
    配角状态: z
      .object({
        大西桂: z
          .object({
            好感度: z
              .coerce.number()
              .describe('大西桂对主角的好感度，范围 0~100，越界自动截断到边界')
              .transform((value) => _.clamp(value, 0, 100))
              .prefault(0),
            外貌: z
              .string()
              .describe('大西桂的颜值档（清秀/漂亮/美丽/惊艳）加一句容貌或身材简评，与校园NPC群像生成规则一致')
              .prefault('丰盈有致，低马尾，银框眼镜挂在胸前'),
            当前穿着: z
              .string()
              .describe('大西桂当前身上穿/不穿的直白描述')
              .prefault('全裸'),
            配饰: z
              .string()
              .describe('大西桂当前佩戴的配饰清单，未佩戴写「无」，品类与裸体配饰条目一致')
              .prefault('无'),
            内心活动: z
              .string()
              .describe('大西桂此刻的一两句心里话，随回合更新')
              .prefault('平静如常'),
            身体状态: z
              .string()
              .describe('从头到脚一段融合状态描述，写法约定同女主身体十栏：单句平实动态、只写此刻怎么了、句式互不重复、不堆叠「有些/已经/还在」、位置感优先（贴着哪、垂向哪、搭在哪）；静态形状/颜色/触感见各自条目')
              .prefault('无异状'),
          })
          .describe('宿管阿姨，向阳庄一层坐镇；角色提示：碎花围裙、爱念叨、收快递担当')
          .prefault({}),
        藤宫麻衣: z
          .object({
            好感度: z
              .coerce.number()
              .describe('藤宫麻衣对主角的好感度，范围 0~100，越界自动截断到边界')
              .transform((value) => _.clamp(value, 0, 100))
              .prefault(0),
            外貌: z
              .string()
              .describe('藤宫麻衣的颜值档（清秀/漂亮/美丽/惊艳）加一句容貌或身材简评，与校园NPC群像生成规则一致')
              .prefault('美丽：单眼皮笑眼，个子高腿长'),
            当前穿着: z
              .string()
              .describe('藤宫麻衣当前身上穿/不穿的直白描述')
              .prefault('全裸'),
            配饰: z
              .string()
              .describe('藤宫麻衣当前佩戴的配饰清单，未佩戴写「无」，品类与裸体配饰条目一致')
              .prefault('无'),
            内心活动: z
              .string()
              .describe('藤宫麻衣此刻的一两句心里话，随回合更新')
              .prefault('平静如常'),
            身体状态: z
              .string()
              .describe('从头到脚一段融合状态描述，写法约定同女主身体十栏：单句平实动态、只写此刻怎么了、句式互不重复、不堆叠「有些/已经/还在」、位置感优先（贴着哪、垂向哪、搭在哪）；静态形状/颜色/触感见各自条目')
              .prefault('无异状'),
          })
          .describe('角色提示：慵懒、捧着漫画不撒手、常占沙发')
          .prefault({}),
        樋口柚: z
          .object({
            好感度: z
              .coerce.number()
              .describe('樋口柚对主角的好感度，范围 0~100，越界自动截断到边界')
              .transform((value) => _.clamp(value, 0, 100))
              .prefault(0),
            外貌: z
              .string()
              .describe('樋口柚的颜值档（清秀/漂亮/美丽/惊艳）加一句容貌或身材简评，与校园NPC群像生成规则一致')
              .prefault('清秀：素净干净的长相，马尾别着铅笔'),
            当前穿着: z
              .string()
              .describe('樋口柚当前身上穿/不穿的直白描述')
              .prefault('全裸'),
            配饰: z
              .string()
              .describe('樋口柚当前佩戴的配饰清单，未佩戴写「无」，品类与裸体配饰条目一致')
              .prefault('无'),
            内心活动: z
              .string()
              .describe('樋口柚此刻的一两句心里话，随回合更新')
              .prefault('平静如常'),
            身体状态: z
              .string()
              .describe('从头到脚一段融合状态描述，写法约定同女主身体十栏：单句平实动态、只写此刻怎么了、句式互不重复、不堆叠「有些/已经/还在」、位置感优先（贴着哪、垂向哪、搭在哪）；静态形状/颜色/触感见各自条目')
              .prefault('无异状'),
          })
          .describe('角色提示：永远踩点、拿笔记换果汁')
          .prefault({}),
        真行寺沙织: z
          .object({
            好感度: z
              .coerce.number()
              .describe('真行寺沙织对主角的好感度，范围 0~100，越界自动截断到边界')
              .transform((value) => _.clamp(value, 0, 100))
              .prefault(0),
            外貌: z
              .string()
              .describe('真行寺沙织的颜值档（清秀/漂亮/美丽/惊艳）加一句容貌或身材简评，与校园NPC群像生成规则一致')
              .prefault('惊艳：成熟系的圆润身段，白手套与银项圈链'),
            当前穿着: z
              .string()
              .describe('真行寺沙织当前身上穿/不穿的直白描述')
              .prefault('全裸'),
            配饰: z
              .string()
              .describe('真行寺沙织当前佩戴的配饰清单，未佩戴写「无」，品类与裸体配饰条目一致')
              .prefault('无'),
            内心活动: z
              .string()
              .describe('真行寺沙织此刻的一两句心里话，随回合更新')
              .prefault('平静如常'),
            身体状态: z
              .string()
              .describe('从头到脚一段融合状态描述，写法约定同女主身体十栏：单句平实动态、只写此刻怎么了、句式互不重复、不堆叠「有些/已经/还在」、位置感优先（贴着哪、垂向哪、搭在哪）；静态形状/颜色/触感见各自条目')
              .prefault('无异状'),
          })
          .describe('角色提示：白手套、宝石座行家、生意人式的周到')
          .prefault({}),
      })
      .prefault({}),
    随机NPC: z
      .record(
        z.string().describe('随机 NPC 名字，简体中文'),
        z
          .object({
            好感度: z
              .coerce.number()
              .describe('该随机 NPC 对主角的好感度，范围 0~100，越界自动截断到边界')
              .transform((value) => _.clamp(value, 0, 100))
              .prefault(0),
            外貌: z
              .string()
              .describe('该随机 NPC 的颜值档（清秀/漂亮/美丽/惊艳）加一句容貌或身材简评，登场时按校园NPC群像生成规则随机决定')
              .prefault('清秀'),
            当前穿着: z
              .string()
              .describe('该随机 NPC 当前身上穿/不穿的直白描述')
              .prefault('全裸'),
            配饰: z
              .string()
              .describe('该随机 NPC 当前佩戴的配饰清单，未佩戴写「无」；登场时按身份随机搭配零到两件裸配（尾饰/丝袜/项圈/脚链/发箍/季节限定等品类抽取），品类与裸体配饰条目一致')
              .prefault('无'),
            内心活动: z
              .string()
              .describe('该随机 NPC 此刻的一两句心里话')
              .prefault('平静如常'),
            身体状态: z
              .string()
              .describe('从头到脚一段融合状态描述，写法约定同女主身体十栏（单句平实动态、句式互不重复、位置感优先），静态特征见各自条目')
              .prefault('无异状'),
          })
          .prefault({})
      )
      .describe('随机遭遇的女性 NPC 状态池，键＝NPC 名字（简体中文），随剧情动态增删。遗忘三规则：①池上限 5 人，超出时删除最久未出场者；②无名且无后续的纯路人，遭遇结束即删；③用户指令「忘掉○○」时删除对应条目。配角状态中的四位固定配角受更新规则层保护，遗忘规则不适用于它们')
      .prefault({})
  })
  .prefault({});

export type Schema = z.output<typeof Schema>;
