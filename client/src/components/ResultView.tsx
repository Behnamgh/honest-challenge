import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';

interface IOutlet {
    name: string;
    founded: boolean;
}

interface IProps {
    result: IOutlet;
}

const useStyles = makeStyles({
    card: {
        minWidth: 275,
        width: "50%",
        margin: "0 auto",
    },
    title: {
        fontSize: 18,
        color: "#eb5234",
    },
});

const ResultView = (props: IProps) => {
    const classes = useStyles();
    const { result } = props;
    return (
        <Card className={classes.card}>
            <CardContent>
                {result.founded ?
                    <Typography variant="h5" component="h2">
                        {result.name}
                    </Typography>
                    :
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Nothing Found!!
                    </Typography>
                }
            </CardContent>

        </Card>
    );
};
export default ResultView;
