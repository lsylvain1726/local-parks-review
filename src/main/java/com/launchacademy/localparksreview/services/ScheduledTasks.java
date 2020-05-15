package com.launchacademy.localparksreview.services;

import com.launchacademy.localparksreview.seeders.ParkSeeder;
import com.launchacademy.localparksreview.seeders.UpdateSeeder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;

import java.text.SimpleDateFormat;
import java.util.Date;

public class ScheduledTasks {
    @Autowired
    private UpdateSeeder seeder;
    private static final Logger log = LoggerFactory.getLogger(ScheduledTasks.class);
    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

    /** Cron expression is represented by six fields:
     * minute, hour, day of month, month, day(s) of week
     * at 23:30 everyday */
    @Scheduled(cron = "0 30 23 * * ?")
    public void updateDatabase() {
        log.info("Updating database {}", dateFormat.format(new Date()));
        try {
            seeder.run();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
