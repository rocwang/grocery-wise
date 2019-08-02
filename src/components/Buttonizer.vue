<script>
export default {
  functional: true,
  name: "Buttonizer",
  props: {
    modifier: {
      type: String,
      required: false,
      validator(modifier) {
        return ["primary", "secondary", "icon"].includes(modifier);
      }
    },
    fullWidth: {
      type: Boolean,
      default: false
    }
  },
  render(createElement, { props, children, $style }) {
    // Work around for unit testing on functional components with css module
    $style = $style || {
      root: "root",
      fullWidth: "fullWidth",
      primary: "primary",
      secondary: "secondary",
      icon: "icon"
    };

    let classNames = [$style.root, { [$style.fullWidth]: props.fullWidth }];

    if (props.modifier) {
      classNames.push($style[props.modifier]);
    }

    return children.map(child => {
      if (!child.data) {
        child.data = {};
      }

      child.data.class = child.data.class
        ? classNames.concat(child.data.class)
        : classNames;

      return child;
    });
  }
};
</script>

<style module>
.root {
  cursor: pointer;
  touch-action: manipulation;
}

.root[disabled] {
  cursor: default;
}

.root:active {
  transform: translate(1px, 1px);
}

.fullWidth {
  display: block;
  width: 100%;
}
.primary,
.secondary {
  font-size: 1.6rem;
  text-align: center;
  padding: 11px 35px;
  box-shadow: 2px 2px 4px 0 var(--c-black);
}

.primary {
  background-color: var(--c-blue);
  color: var(--c-white);
}

.primary:disabled {
  background-color: var(--c-gray-a);
}

.secondary {
  background-color: var(--c-white);
  color: var(--c-blue);
}

.secondary:disabled {
  color: var(--c-gray-a);
}

.icon {
  padding: 8px;
}

.icon svg {
  width: 20px;
}
</style>
