package com.launchacademy.localparksreview.seeders;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;

@Component
public class ScheduledTasks {
    @Autowired
    private ParkSeeder seeder;
    private static final Logger log = LoggerFactory.getLogger(ScheduledTasks.class);
    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

    /** Cron expression is represented by six fields:
     * minute, hour, day of month, month, day(s) of week
     * at 23:30 everyday */
    @Scheduled(cron = "0 0 23 * * ?")
    public void updateDatabase() {
        log.info("Updating database {}", dateFormat.format(new Date()));
        try {
            seeder.run();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
