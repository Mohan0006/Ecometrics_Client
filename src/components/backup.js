<Grid container >
                                <Grid item>
                                    <FontAwesomeIcon icon={faSun} style={{ fontSize: '55px', marginRight: "5" }} /> {/* Replace with your weather icon */}
                                </Grid>
                                <Grid item>
                                    <Typography variant="h3">
                                        {weatherData.temperature + '°C'}
                                    </Typography>
                                    <Typography variant="h5">
                                        {weatherData.condition}
                                    </Typography>
                                    <a href="#"> Refresh <FontAwesomeIcon icon={faSyncAlt} /></a>
                                </Grid>

                            </Grid>