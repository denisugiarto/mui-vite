import Grid, { GridProps } from "@mui/material/Grid"
// import Paper from "@mui/material/Paper"
import Typography, {
  TypographyPropsVariantOverrides,
} from "@mui/material/Typography"
import React, {
  ReactElement,
  ReactNode,
  createContext,
  useContext,
} from "react"
import { OverridableStringUnion } from "@mui/types"
import { Variant } from "@mui/material/styles/createTypography"

export type ItemLayoutType = {
  xs?: number
  md?: number
  lg?: number
  xl?: number
}

export type ContainerLayoutType = {
  spacing?: number
}

export type GridLayoutType = {
  itemLayout: ContainerLayoutType & ItemLayoutType
  captionLayout: ItemLayoutType
  captionVariant: OverridableStringUnion<
    Variant | "inherit",
    TypographyPropsVariantOverrides
  >
  inputLayout: ItemLayoutType
}

const layoutContext = createContext<GridLayoutType>({
  itemLayout: { md: 6, xs: 12, spacing: 1 },
  captionLayout: { xs: 4 },
  captionVariant: "caption",
  inputLayout: { xs: 8 },
})

type TGridContainer = {
  elevation?: number
  spacing?: number
  itemLayout?: ContainerLayoutType & ItemLayoutType
  captionLayout?: ItemLayoutType
  captionVariant?: OverridableStringUnion<
    Variant | "inherit",
    TypographyPropsVariantOverrides
  >
  inputLayout?: ItemLayoutType
  children?: ReactNode
} & GridProps
export function GridContainer({
  elevation = 1,
  spacing = 1,
  itemLayout = { md: 6, xs: 12, spacing: 1 },
  captionLayout = { xs: 4 },
  captionVariant = "caption",
  inputLayout = { xs: 8 },
  children,
  ...props
}: TGridContainer): ReactElement {
  return (
    // <Paper elevation={elevation}>
    <layoutContext.Provider
      value={{
        itemLayout: itemLayout,
        captionLayout: captionLayout,
        captionVariant: captionVariant,
        inputLayout: inputLayout,
      }}
    >
      <Grid item container spacing={spacing} {...props}>
        {children}
      </Grid>
    </layoutContext.Provider>
    // </Paper>
  )
}

export function GridInput({
  caption = "",
  required = false,
  itemLayout,
  captionLayout,
  captionVariant,
  inputLayout,
  children,
}: {
  caption?: string
  required?: boolean
  itemLayout?: ContainerLayoutType & ItemLayoutType
  captionLayout?: ItemLayoutType
  captionVariant?: OverridableStringUnion<
    Variant | "inherit",
    TypographyPropsVariantOverrides
  >
  inputLayout?: ItemLayoutType
  children?: ReactNode
}): ReactElement {
  const layout = useContext(layoutContext)

  const _itemLayout = { ...layout.itemLayout, ...itemLayout }
  const _captionLayout = { ...layout.captionLayout, ...captionLayout }
  const _captionVariant = layout.captionVariant ?? captionVariant
  const _inputLayout = { ...layout.inputLayout, ...inputLayout }

  return (
    <Grid
      item
      container
      {..._itemLayout}
      // spacing={undefined}
      // rowSpacing={0}
      // columnSpacing={_itemLayout.spacing * 2}
    >
      <Grid item {..._captionLayout}>
        <Typography variant={_captionVariant}>
          {caption}
          {required && <span className="required"> *</span>}
        </Typography>
      </Grid>
      <Grid item container {..._inputLayout}>
        {children}
      </Grid>
    </Grid>
  )
}

export function GridSpace({
  itemLayout,
}: {
  itemLayout?: ContainerLayoutType & ItemLayoutType
}): ReactElement {
  const layout = useContext(layoutContext)

  const _itemLayout = { ...layout.itemLayout, ...itemLayout }

  return (
    <Grid
      item
      container
      {..._itemLayout}
      // spacing={undefined}
      // rowSpacing={0}
      // columnSpacing={_itemLayout.spacing * 2}
    ></Grid>
  )
}
