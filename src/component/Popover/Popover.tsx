import { arrow, FloatingPortal, offset, type Placement, shift, useFloating } from '@floating-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ElementType, useRef, useState } from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  renderPopover: React.ReactNode;
  as?: ElementType;
  initialOpen?: boolean;
  arrow?: boolean;
  placement?: Placement;
  offset?: number;
  disable?: boolean;
};

const Popover = (props: Props) => {
  const {
    children,
    className,
    renderPopover,
    as: Element = 'div',
    initialOpen,
    arrow: hasArrow = true,
    placement = 'bottom-end',
    offset: offsetChildren = 6,
    disable = false
  } = props;

  const [showTooltip, setShowTooltip] = useState<boolean>(initialOpen || false);

  const arrowRef = useRef<HTMLElement>(null);

  const { x, y, strategy, floating, reference, middlewareData } = useFloating({
    middleware: [offset(offsetChildren), shift(), arrow({ element: arrowRef })],
    placement: placement
  });

  const handleShowTooltip = () => {
    if (disable) {
      return;
    }
    setShowTooltip(true);
  };
  const handleHideTooltip = () => {
    if (disable) {
      return;
    }
    setShowTooltip(false);
  };

  return (
    <Element className={className} onMouseEnter={handleShowTooltip} onMouseLeave={handleHideTooltip} ref={reference}>
      {children}
      <FloatingPortal>
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              ref={floating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content',
                transformOrigin: `${middlewareData.arrow?.x} top`
              }}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ dution: 0.3 }}
            >
              {hasArrow && (
                <span
                  ref={arrowRef}
                  className='absolute z-10 translate-y-[-95%] border-[11px] border-x-transparent border-t-transparent border-b-white'
                  style={{
                    left: middlewareData.arrow?.x,
                    top: middlewareData.arrow?.y
                  }}
                />
              )}

              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  );
};

export default Popover;
