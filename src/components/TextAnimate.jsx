import { memo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const motionElements = {
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  p: motion.p,
  span: motion.span,
}

const staggerTimings = {
  text: 0.06,
  word: 0.05,
  character: 0.03,
  line: 0.06,
}

const defaultContainerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0,
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
}

const defaultItemVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
  exit: { opacity: 0 },
}

const defaultItemAnimationVariants = {
  fadeIn: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3 },
      },
      exit: {
        opacity: 0,
        y: 20,
        transition: { duration: 0.3 },
      },
    },
  },
  blurIn: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: 'blur(10px)' },
      show: {
        opacity: 1,
        filter: 'blur(0px)',
        transition: { duration: 0.3 },
      },
      exit: {
        opacity: 0,
        filter: 'blur(10px)',
        transition: { duration: 0.3 },
      },
    },
  },
  blurInUp: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: 'blur(10px)', y: 20 },
      show: {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        transition: {
          y: { duration: 0.3 },
          opacity: { duration: 0.4 },
          filter: { duration: 0.3 },
        },
      },
      exit: {
        opacity: 0,
        filter: 'blur(10px)',
        y: 20,
        transition: {
          y: { duration: 0.3 },
          opacity: { duration: 0.4 },
          filter: { duration: 0.3 },
        },
      },
    },
  },
  blurInDown: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: 'blur(10px)', y: -20 },
      show: {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        transition: {
          y: { duration: 0.3 },
          opacity: { duration: 0.4 },
          filter: { duration: 0.3 },
        },
      },
    },
  },
}

function TextAnimateBase({
  children,
  delay = 0,
  duration = 0.3,
  variants,
  className = '',
  segmentClassName = '',
  as: Component = 'p',
  startOnView = true,
  once = false,
  by = 'word',
  animation = 'fadeIn',
  accessible = true,
  ...props
}) {
  const MotionComponent = motionElements[Component] || motion.p

  let segments = []
  if (typeof children === 'string') {
    switch (by) {
      case 'word':
        segments = children.split(/(\s+)/)
        break
      case 'character':
        segments = children.split('')
        break
      case 'line':
        segments = children.split('\n')
        break
      case 'text':
      default:
        segments = [children]
        break
    }
  } else {
    // If children is not a string, assume it is pre-split array of segment objects
    segments = Array.isArray(children) ? children : [children]
  }

  const finalVariants = variants
    ? {
        container: {
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              opacity: { duration: 0.01, delay },
              delayChildren: delay,
              staggerChildren: duration / segments.length,
            },
          },
          exit: {
            opacity: 0,
            transition: {
              staggerChildren: duration / segments.length,
              staggerDirection: -1,
            },
          },
        },
        item: variants,
      }
    : animation && defaultItemAnimationVariants[animation]
      ? {
          container: {
            ...defaultItemAnimationVariants[animation].container,
            show: {
              ...defaultItemAnimationVariants[animation].container.show,
              transition: {
                delayChildren: delay,
                staggerChildren: duration / segments.length,
              },
            },
            exit: {
              ...defaultItemAnimationVariants[animation].container.exit,
              transition: {
                staggerChildren: duration / segments.length,
                staggerDirection: -1,
              },
            },
          },
          item: defaultItemAnimationVariants[animation].item,
        }
      : { container: defaultContainerVariants, item: defaultItemVariants }

  const ariaLabel = accessible && typeof children === 'string' ? children : undefined

  return (
    <AnimatePresence mode="popLayout">
      <MotionComponent
        variants={finalVariants.container}
        initial="hidden"
        whileInView={startOnView ? 'show' : undefined}
        animate={startOnView ? undefined : 'show'}
        exit="exit"
        className={`whitespace-pre-wrap ${className}`}
        viewport={{ once }}
        aria-label={ariaLabel}
        {...props}
      >
        {accessible && typeof children === 'string' && (
          <span
            style={{
              position: 'absolute',
              width: '1px',
              height: '1px',
              padding: 0,
              margin: '-1px',
              overflow: 'hidden',
              clip: 'rect(0, 0, 0, 0)',
              whiteSpace: 'nowrap',
              borderWidth: 0,
            }}
          >
            {children}
          </span>
        )}
        {segments.map((segment, i) => {
          const isObj = typeof segment === 'object' && segment !== null
          const textVal = isObj ? segment.text : segment
          const customClass = isObj ? segment.className : ''
          
          if (textVal === '\n') {
            return <br key={`br-${i}`} />
          }

          return (
            <motion.span
              key={`${by}-${textVal}-${i}`}
              variants={finalVariants.item}
              custom={i * (staggerTimings[by] || 0.05)}
              className={`${by === 'line' ? 'block' : 'inline-block whitespace-pre'} ${customClass} ${segmentClassName}`}
              aria-hidden={accessible ? true : undefined}
            >
              {textVal}
            </motion.span>
          )
        })}
      </MotionComponent>
    </AnimatePresence>
  )
}

export const TextAnimate = memo(TextAnimateBase)
