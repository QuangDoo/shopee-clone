import { Button, Popover } from 'src/component';

const SortProductList = () => {
  return (
    <div className='grid grid-cols-9 bg-gray-300 py-2 px-3'>
      <div className='col-span-1 mt-1 text-sm text-gray-400'>Sắp xếp theo</div>
      <Button className='col-span-1 mx-1 rounded bg-primary10 py-1 text-center text-sm text-white hover:bg-orange-500'>
        Phổ biến
      </Button>
      <Button className='col-span-1 mx-1 rounded bg-white py-1 text-center text-sm hover:bg-slate-100'>Mới nhất</Button>
      <Button className='col-span-1 mx-1 rounded bg-white py-1 text-center text-sm hover:bg-slate-100'>Bán chạy</Button>
      <Popover
        offset={2}
        arrow={false}
        className='col-span-2 mx-1 cursor-pointer rounded bg-white py-1 px-2 text-sm hover:bg-slate-100'
        renderPopover={
          <div className='flex-col items-start bg-white p-2'>
            <div className='py-1 text-sm'>Giá: Thấp tới cao</div>
            <div className='py-1 text-sm'>Giá: Cao tới thấp</div>
          </div>
        }
      >
        <div className='flex items-center justify-between'>
          <div>Bán chạy</div>
          <svg viewBox='0 0 10 6' className='h-2 w-2'>
            <path
              d='M9.7503478 1.37413402L5.3649665 5.78112957c-.1947815.19574157-.511363.19651982-.7071046.00173827a.50153763.50153763 0 0 1-.0008702-.00086807L.2050664 1.33007451l.0007126-.00071253C.077901 1.18820749 0 1.0009341 0 .79546595 0 .35614224.3561422 0 .7954659 0c.2054682 0 .3927416.07790103.5338961.20577896l.0006632-.00066318.0226101.02261012a.80128317.80128317 0 0 1 .0105706.0105706l3.3619016 3.36190165c.1562097.15620972.4094757.15620972.5656855 0a.42598723.42598723 0 0 0 .0006944-.00069616L8.6678481.20650022l.0009529.0009482C8.8101657.07857935 8.9981733 0 9.2045341 0 9.6438578 0 10 .35614224 10 .79546595c0 .20495443-.077512.39180497-.2048207.53283641l.0003896.00038772-.0096728.00972053a.80044712.80044712 0 0 1-.0355483.03572341z'
              fillRule='nonzero'
            ></path>
          </svg>
        </div>
      </Popover>
      <div className='col-span-3'>
        <div className='flex items-center justify-end'>
          <div className='text-sm text-primary10'>1</div>
          <div className='mr-1 text-sm text-gray-600'>/9</div>
          <Button className='bg-white p-2 shadow' disabled>
            <svg viewBox='0 0 7 11' className='h-2 w-2'>
              <path
                d='M4.694078 9.8185598L.2870824 5.4331785c-.1957415-.1947815-.1965198-.511363-.0017382-.7071046a.50867033.50867033 0 0 1 .000868-.0008702L4.7381375.2732784 4.73885.273991c.1411545-.127878.3284279-.205779.5338961-.205779.4393237 0 .7954659.3561422.7954659.7954659 0 .2054682-.077901.3927416-.205779.5338961l.0006632.0006632-.0226101.0226101a.80174653.80174653 0 0 1-.0105706.0105706L2.4680138 4.7933195c-.1562097.1562097-.1562097.4094757 0 .5656855a.45579485.45579485 0 0 0 .0006962.0006944l3.3930018 3.3763607-.0009482.0009529c.128869.1413647.2074484.3293723.2074484.5357331 0 .4393237-.3561422.7954659-.7954659.7954659-.2049545 0-.391805-.077512-.5328365-.2048207l-.0003877.0003896-.0097205-.0096728a.80042023.80042023 0 0 1-.0357234-.0355483z'
                fillRule='nonzero'
              ></path>
            </svg>
          </Button>
          <Button className='bg-white p-2 shadow'>
            <svg viewBox='0 0 7 11' className='h-2 w-2'>
              <path
                d='M2.305922 9.81856l4.4069956-4.385381c.1957415-.194782.1965198-.511364.0017382-.707105a.26384055.26384055 0 0 0-.000868-.00087L2.2618625.273278 2.26115.273991C2.1199955.146113 1.9327221.068212 1.7272539.068212c-.4393237 0-.7954659.356142-.7954659.795466 0 .205468.077901.392741.205779.533896l-.0006632.000663.0226101.02261c.0034906.003557.0070143.00708.0105706.010571L4.5319862 4.79332c.1562097.156209.1562097.409475 0 .565685-.0002318.000232-.0004639.000463-.0006962.000694L1.1382882 8.73606l.0009482.000953c-.128869.141365-.2074484.329372-.2074484.535733 0 .439324.3561422.795466.7954659.795466.2049545 0 .391805-.077512.5328365-.204821l.0003877.00039.0097205-.009673c.012278-.011471.0241922-.023327.0357234-.035548z'
                fillRule='nonzero'
              ></path>
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SortProductList;
