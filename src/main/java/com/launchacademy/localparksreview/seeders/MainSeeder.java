package com.launchacademy.localparksreview.seeders;

import com.launchacademy.localparksreview.repositories.ParkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;


@Component
public class MainSeeder implements CommandLineRunner {
    private final ParkSeeder seeder;
    private final ParkRepository repo;

    @Autowired
    public MainSeeder(ParkSeeder seeder, ParkRepository repo) {
        this.seeder = seeder;
        this.repo = repo;
    }

    @Override
    public void run(String... args) throws Exception {
        if (repo.count() == 0) {
            seeder.run();
        }
    }
}
